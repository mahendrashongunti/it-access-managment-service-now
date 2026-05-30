/**
 * ServiceNow Script Include: AccessRequestService
 * 
 * Business logic for access request management.
 * 
 * Spring Boot Equivalent: @Service AccessRequestService
 */

export const AccessRequestService = `
var AccessRequestService = Class.create();
AccessRequestService.prototype = {
    initialize: function() {
    },
    
    /**
     * Create a new access request
     * @param {Object} data - Request data
     * @returns {String} - sys_id of created request
     */
    createRequest: function(data) {
        var gr = new GlideRecord('x_itam_access_request');
        gr.initialize();
        gr.requester = data.requester || gs.getUserID();
        gr.beneficiary = data.beneficiary || gs.getUserID();
        gr.application = data.application;
        gr.access_type = data.access_type;
        gr.business_justification = data.business_justification;
        gr.state = 'draft';
        gr.priority = data.priority || 'medium';
        gr.urgency = data.urgency || 'medium';
        gr.requested_duration_days = data.requested_duration_days;
        
        // Calculate risk level from access type
        this._calculateRiskLevel(gr);
        
        var sys_id = gr.insert();
        
        // Log audit trail
        this._logAudit(sys_id, 'create', {});
        
        return sys_id;
    },
    
    /**
     * Submit request for approval
     * @param {String} requestId - Request sys_id
     * @returns {Boolean} - Success status
     */
    submitRequest: function(requestId) {
        var gr = new GlideRecord('x_itam_access_request');
        if (!gr.get(requestId)) {
            return false;
        }
        
        // Validate request
        if (!this._validateRequest(gr)) {
            return false;
        }
        
        gr.state = 'submitted';
        gr.submitted_at = new GlideDateTime();
        gr.update();
        
        // Create approvals
        this._createApprovals(gr);
        
        // Send notification
        this._sendNotification(gr, 'request_submitted');
        
        // Log audit
        this._logAudit(requestId, 'submit', {});
        
        return true;
    },
    
    /**
     * Cancel a request
     * @param {String} requestId - Request sys_id
     * @param {String} reason - Cancellation reason
     * @returns {Boolean} - Success status
     */
    cancelRequest: function(requestId, reason) {
        var gr = new GlideRecord('x_itam_access_request');
        if (!gr.get(requestId)) {
            return false;
        }
        
        // Only allow cancellation of non-completed requests
        if (gr.state == 'completed' || gr.state == 'cancelled') {
            return false;
        }
        
        gr.state = 'cancelled';
        gr.work_notes = 'Cancelled: ' + reason;
        gr.update();
        
        // Cancel pending approvals
        this._cancelApprovals(requestId);
        
        // Log audit
        this._logAudit(requestId, 'cancel', { reason: reason });
        
        return true;
    },
    
    /**
     * Process approved request
     * @param {String} requestId - Request sys_id
     */
    processApproval: function(requestId) {
        var gr = new GlideRecord('x_itam_access_request');
        if (!gr.get(requestId)) {
            return;
        }
        
        // Check if all required approvals are complete
        if (!this._allApprovalsComplete(requestId)) {
            return;
        }
        
        gr.state = 'approved';
        gr.update();
        
        // Check if auto-provision
        var app = new GlideRecord('x_itam_application');
        if (app.get(gr.application) && app.auto_provision) {
            this._provisionAccess(gr);
        } else {
            gr.state = 'provisioning';
            gr.update();
            // Send to fulfiller
            this._sendNotification(gr, 'fulfillment_required');
        }
    },
    
    /**
     * Provision access automatically
     * @param {GlideRecord} requestGr - Request record
     */
    _provisionAccess: function(requestGr) {
        // Create assignment
        var assignment = new GlideRecord('x_itam_assignment');
        assignment.initialize();
        assignment.user = requestGr.beneficiary;
        assignment.application = requestGr.application;
        assignment.access_type = requestGr.access_type;
        assignment.request = requestGr.sys_id;
        assignment.granted_at = new GlideDateTime();
        assignment.state = 'active';
        
        // Calculate expiration
        if (requestGr.requested_duration_days) {
            var expDate = new GlideDateTime();
            expDate.addDaysLocalTime(requestGr.requested_duration_days);
            assignment.expires_at = expDate;
        }
        
        assignment.insert();
        
        // Update request
        requestGr.state = 'completed';
        requestGr.completed_at = new GlideDateTime();
        requestGr.update();
        
        // Send notification
        this._sendNotification(requestGr, 'access_granted');
    },
    
    /**
     * Create approval records
     * @param {GlideRecord} requestGr - Request record
     */
    _createApprovals: function(requestGr) {
        var accessType = new GlideRecord('x_itam_access_type');
        if (!accessType.get(requestGr.access_type)) {
            return;
        }
        
        var order = 1;
        
        // Manager approval
        if (accessType.requires_manager_approval) {
            this._createApproval(requestGr, 'manager', order++);
        }
        
        // Resource owner approval
        if (accessType.requires_owner_approval) {
            this._createApproval(requestGr, 'resource_owner', order++);
        }
        
        // Security approval
        if (accessType.requires_security_approval) {
            this._createApproval(requestGr, 'security', order++);
        }
    },
    
    /**
     * Create single approval record
     * @param {GlideRecord} requestGr - Request record
     * @param {String} type - Approver type
     * @param {Number} order - Approval order
     */
    _createApproval: function(requestGr, type, order) {
        var approval = new GlideRecord('sysapproval_approver');
        approval.initialize();
        approval.sysapproval = requestGr.sys_id;
        approval.source_table = 'x_itam_access_request';
        approval.approver = this._getApprover(requestGr, type);
        approval.state = 'pending';
        approval.setValue('approver_type', type);
        approval.setValue('order', order);
        approval.insert();
    },
    
    /**
     * Get approver for type
     * @param {GlideRecord} requestGr - Request record
     * @param {String} type - Approver type
     * @returns {String} - Approver sys_id
     */
    _getApprover: function(requestGr, type) {
        if (type == 'manager') {
            var user = new GlideRecord('sys_user');
            if (user.get(requestGr.beneficiary)) {
                return user.manager;
            }
        } else if (type == 'resource_owner') {
            var app = new GlideRecord('x_itam_application');
            if (app.get(requestGr.application)) {
                return app.owner;
            }
        } else if (type == 'security') {
            // Get security team member
            return this._getSecurityApprover();
        }
        return '';
    },
    
    /**
     * Calculate risk level from access type
     * @param {GlideRecord} gr - Request record
     */
    _calculateRiskLevel: function(gr) {
        var accessType = new GlideRecord('x_itam_access_type');
        if (accessType.get(gr.access_type)) {
            gr.risk_level = accessType.risk_level;
        }
    },
    
    /**
     * Validate request before submission
     * @param {GlideRecord} gr - Request record
     * @returns {Boolean} - Valid status
     */
    _validateRequest: function(gr) {
        if (!gr.beneficiary || !gr.application || !gr.access_type || !gr.business_justification) {
            return false;
        }
        return true;
    },
    
    /**
     * Check if all approvals are complete
     * @param {String} requestId - Request sys_id
     * @returns {Boolean} - All complete status
     */
    _allApprovalsComplete: function(requestId) {
        var approval = new GlideRecord('sysapproval_approver');
        approval.addQuery('sysapproval', requestId);
        approval.addQuery('state', 'pending');
        approval.query();
        return !approval.hasNext();
    },
    
    /**
     * Cancel pending approvals
     * @param {String} requestId - Request sys_id
     */
    _cancelApprovals: function(requestId) {
        var approval = new GlideRecord('sysapproval_approver');
        approval.addQuery('sysapproval', requestId);
        approval.addQuery('state', 'pending');
        approval.query();
        while (approval.next()) {
            approval.state = 'cancelled';
            approval.update();
        }
    },
    
    /**
     * Log audit trail
     * @param {String} entityId - Entity sys_id
     * @param {String} action - Action performed
     * @param {Object} changes - Changes made
     */
    _logAudit: function(entityId, action, changes) {
        var audit = new GlideRecord('x_itam_audit_log');
        audit.initialize();
        audit.entity_type = 'request';
        audit.entity_id = entityId;
        audit.action = action;
        audit.user = gs.getUserID();
        audit.changes = JSON.stringify(changes);
        audit.ip_address = gs.getSession().getClientIP();
        audit.timestamp = new GlideDateTime();
        audit.insert();
    },
    
    /**
     * Send notification
     * @param {GlideRecord} gr - Request record
     * @param {String} type - Notification type
     */
    _sendNotification: function(gr, type) {
        // Implementation would use gs.eventQueue or notification engine
        gs.eventQueue(type, gr, gr.requester, gr.beneficiary);
    },
    
    type: 'AccessRequestService'
};
`;
