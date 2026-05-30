/**
 * ServiceNow Scripted REST API: Access Request API
 * 
 * Provides RESTful endpoints for access request management.
 * 
 * Base Path: /api/itam/v1/requests
 * 
 * Spring Boot Equivalent: @RestController @RequestMapping("/api/itam/v1/requests")
 */

export const AccessRequestRestAPI = {
  
  // GET /api/itam/v1/requests
  // List access requests
  GET: `
(function process(request, response) {
    
    var requestService = new AccessRequestService();
    
    // Get query parameters
    var filter = request.queryParams.filter || 'all';
    var page = parseInt(request.queryParams.page) || 1;
    var pageSize = parseInt(request.queryParams.pageSize) || 30;
    var userId = gs.getUserID();
    
    // Build query
    var gr = new GlideRecord('x_2060089_itacc_access_request');
    
    // Apply filters
    if (filter == 'my_requests') {
        gr.addQuery('requester', userId);
    } else if (filter == 'pending') {
        gr.addQuery('state', 'pending_approval');
    } else if (filter == 'approved') {
        gr.addQuery('state', 'approved');
    } else if (filter == 'rejected') {
        gr.addQuery('state', 'rejected');
    }
    
    // Count total
    gr.query();
    var total = gr.getRowCount();
    
    // Apply pagination
    gr.chooseWindow((page - 1) * pageSize, page * pageSize);
    gr.orderByDesc('sys_created_on');
    gr.query();
    
    // Build response
    var items = [];
    while (gr.next()) {
        items.push({
            id: gr.sys_id.toString(),
            requestNumber: gr.number.toString(),
            requesterId: gr.requester.toString(),
            requesterName: gr.requester.getDisplayValue(),
            beneficiaryId: gr.beneficiary.toString(),
            beneficiaryName: gr.beneficiary.getDisplayValue(),
            applicationId: gr.application.toString(),
            applicationName: gr.application.getDisplayValue(),
            accessTypeId: gr.access_type.toString(),
            accessTypeName: gr.access_type.getDisplayValue(),
            businessJustification: gr.business_justification.toString(),
            state: gr.state.toString(),
            priority: gr.priority.toString(),
            urgency: gr.urgency.toString(),
            riskLevel: gr.risk_level.toString(),
            requestedDurationDays: gr.requested_duration_days.toString(),
            expirationDate: gr.expiration_date.toString(),
            submittedAt: gr.submitted_at.toString(),
            completedAt: gr.completed_at.toString(),
            createdAt: gr.sys_created_on.toString(),
            updatedAt: gr.sys_updated_on.toString()
        });
    }
    
    // Send response
    response.setStatus(200);
    response.setBody({
        success: true,
        data: {
            items: items,
            total: total,
            page: page,
            pageSize: pageSize,
            totalPages: Math.ceil(total / pageSize)
        }
    });
    
})(request, response);
  `,
  
  // POST /api/itam/v1/requests
  // Create new access request
  POST: `
(function process(request, response) {
    
    var requestService = new AccessRequestService();
    
    try {
        // Parse request body
        var data = request.body.data;
        
        // Validate required fields
        if (!data.application || !data.access_type || !data.business_justification) {
            response.setStatus(400);
            response.setBody({
                success: false,
                error: 'Missing required fields'
            });
            return;
        }
        
        // Create request
        var requestId = requestService.createRequest(data);
        
        // Get created record
        var gr = new GlideRecord('x_2060089_itacc_access_request');
        if (gr.get(requestId)) {
            response.setStatus(201);
            response.setBody({
                success: true,
                data: {
                    id: gr.sys_id.toString(),
                    requestNumber: gr.number.toString(),
                    state: gr.state.toString()
                },
                message: 'Request created successfully'
            });
        } else {
            response.setStatus(500);
            response.setBody({
                success: false,
                error: 'Failed to retrieve created request'
            });
        }
        
    } catch (e) {
        gs.error('Error creating request: ' + e.message);
        response.setStatus(500);
        response.setBody({
            success: false,
            error: 'Internal server error: ' + e.message
        });
    }
    
})(request, response);
  `,
  
  // GET /api/itam/v1/requests/{id}
  // Get request by ID
  GET_BY_ID: `
(function process(request, response) {
    
    var requestId = request.pathParams.id;
    
    var gr = new GlideRecord('x_2060089_itacc_access_request');
    if (!gr.get(requestId)) {
        response.setStatus(404);
        response.setBody({
            success: false,
            error: 'Request not found'
        });
        return;
    }
    
    // Build response object
    var requestData = {
        id: gr.sys_id.toString(),
        requestNumber: gr.number.toString(),
        requesterId: gr.requester.toString(),
        requesterName: gr.requester.getDisplayValue(),
        beneficiaryId: gr.beneficiary.toString(),
        beneficiaryName: gr.beneficiary.getDisplayValue(),
        applicationId: gr.application.toString(),
        applicationName: gr.application.getDisplayValue(),
        accessTypeId: gr.access_type.toString(),
        accessTypeName: gr.access_type.getDisplayValue(),
        businessJustification: gr.business_justification.toString(),
        state: gr.state.toString(),
        priority: gr.priority.toString(),
        urgency: gr.urgency.toString(),
        riskLevel: gr.risk_level.toString(),
        requestedDurationDays: gr.requested_duration_days.toString(),
        expirationDate: gr.expiration_date.toString(),
        submittedAt: gr.submitted_at.toString(),
        completedAt: gr.completed_at.toString(),
        createdAt: gr.sys_created_on.toString(),
        updatedAt: gr.sys_updated_on.toString()
    };
    
    response.setStatus(200);
    response.setBody({
        success: true,
        data: requestData
    });
    
})(request, response);
  `,
  
  // POST /api/itam/v1/requests/{id}/submit
  // Submit request for approval
  SUBMIT: `
(function process(request, response) {
    
    var requestService = new AccessRequestService();
    var requestId = request.pathParams.id;
    
    var success = requestService.submitRequest(requestId);
    
    if (success) {
        response.setStatus(200);
        response.setBody({
            success: true,
            message: 'Request submitted successfully'
        });
    } else {
        response.setStatus(400);
        response.setBody({
            success: false,
            error: 'Failed to submit request'
        });
    }
    
})(request, response);
  `,
  
  // POST /api/itam/v1/requests/{id}/cancel
  // Cancel request
  CANCEL: `
(function process(request, response) {
    
    var requestService = new AccessRequestService();
    var requestId = request.pathParams.id;
    var reason = request.body.data.reason || 'No reason provided';
    
    var success = requestService.cancelRequest(requestId, reason);
    
    if (success) {
        response.setStatus(200);
        response.setBody({
            success: true,
            message: 'Request cancelled successfully'
        });
    } else {
        response.setStatus(400);
        response.setBody({
            success: false,
            error: 'Failed to cancel request'
        });
    }
    
})(request, response);
  `
};
