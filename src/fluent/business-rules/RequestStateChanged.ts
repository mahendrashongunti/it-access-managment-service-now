/**
 * ServiceNow Business Rule: Request State Changed
 * 
 * Triggers when request state changes.
 * 
 * Table: x_itam_access_request
 * When: after
 * Update: true
 * Filter: State changes
 * 
 * Spring Boot Equivalent: @EntityListener or @EventListener
 */

export const RequestStateChangedBusinessRule = `
(function executeRule(current, previous) {
    
    // Check if state actually changed
    if (current.state == previous.state) {
        return;
    }
    
    var oldState = previous.state.toString();
    var newState = current.state.toString();
    
    gs.info('Request ' + current.number + ' state changed from ' + oldState + ' to ' + newState);
    
    // Handle state transitions
    switch(newState) {
        case 'submitted':
            handleSubmitted(current);
            break;
        case 'approved':
            handleApproved(current);
            break;
        case 'rejected':
            handleRejected(current);
            break;
        case 'completed':
            handleCompleted(current);
            break;
        case 'cancelled':
            handleCancelled(current);
            break;
    }
    
    // Log audit trail
    logStateChange(current, oldState, newState);
    
    function handleSubmitted(request) {
        // Notify requester
        gs.eventQueue('itam.request.submitted', request, request.requester, '');
        
        // Notify approvers
        notifyApprovers(request);
    }
    
    function handleApproved(request) {
        // Notify requester and beneficiary
        gs.eventQueue('itam.request.approved', request, request.requester, request.beneficiary);
        
        // Check auto-provision
        var app = new GlideRecord('x_itam_application');
        if (app.get(request.application) && app.auto_provision == true) {
            // Auto-provision will be handled by separate workflow
            gs.eventQueue('itam.request.auto_provision', request, '', '');
        } else {
            // Assign to fulfiller
            request.state = 'provisioning';
            request.setWorkflow(false);
            request.update();
        }
    }
    
    function handleRejected(request) {
        // Notify requester and beneficiary
        gs.eventQueue('itam.request.rejected', request, request.requester, request.beneficiary);
    }
    
    function handleCompleted(request) {
        // Notify beneficiary
        gs.eventQueue('itam.access.granted', request, request.beneficiary, '');
        
        // Set completion timestamp
        request.completed_at = new GlideDateTime();
        request.setWorkflow(false);
        request.update();
    }
    
    function handleCancelled(request) {
        // Notify relevant parties
        gs.eventQueue('itam.request.cancelled', request, request.requester, '');
    }
    
    function notifyApprovers(request) {
        var approval = new GlideRecord('sysapproval_approver');
        approval.addQuery('sysapproval', request.sys_id);
        approval.addQuery('state', 'pending');
        approval.query();
        while (approval.next()) {
            gs.eventQueue('itam.approval.pending', approval, approval.approver, '');
        }
    }
    
    function logStateChange(request, oldState, newState) {
        var audit = new GlideRecord('x_itam_audit_log');
        audit.initialize();
        audit.entity_type = 'request';
        audit.entity_id = request.sys_id.toString();
        audit.action = 'update';
        audit.user = gs.getUserID();
        audit.changes = JSON.stringify({
            field: 'state',
            old_value: oldState,
            new_value: newState
        });
        audit.ip_address = gs.getSession().getClientIP();
        audit.timestamp = new GlideDateTime();
        audit.insert();
    }
    
})(current, previous);
`;
