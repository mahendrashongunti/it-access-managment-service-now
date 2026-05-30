# ServiceNow Fundamentals for Spring Boot Developers

## Introduction

This guide maps ServiceNow concepts to Spring Boot equivalents to help Java/Spring developers understand ServiceNow development.

## Core Concept Mapping

| Spring Boot | ServiceNow | Description |
|-------------|------------|-------------|
| @Entity | Table | Data model definition |
| @Repository | GlideRecord | Data access layer |
| @Service | Script Include | Business logic layer |
| @RestController | Scripted REST API | REST endpoint definition |
| @Validation | Business Rule | Data validation logic |
| @PrePersist/@PostPersist | Business Rule (before/after) | Lifecycle hooks |
| @Secured | ACL | Security/authorization |
| Spring Security | ACLs + Roles | Security framework |
| @Scheduled | Scheduled Script Execution | Scheduled tasks |
| JPA Relationships | Reference Fields | Foreign key relationships |
| Spring Workflow | Flow Designer | Workflow engine |

## Tables (Entities)

### Spring Boot Entity
\`\`\`java
@Entity
@Table(name = "access_request")
public class AccessRequest {
    @Id
    @GeneratedValue
    private Long id;
    
    @ManyToOne
    private User requester;
    
    @Column(nullable = false)
    private String businessJustification;
    
    @Enumerated(EnumType.STRING)
    private RequestState state;
}
\`\`\`

### ServiceNow Table
\`\`\`javascript
{
    name: 'x_itam_access_request',
    fields: [
        { name: 'requester', type: 'reference', reference: 'sys_user' },
        { name: 'business_justification', type: 'string', mandatory: true },
        { name: 'state', type: 'string', choice: ['draft', 'submitted', 'approved'] }
    ]
}
\`\`\`

## GlideRecord (Repository)

### Spring Boot Repository
\`\`\`java
@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Long> {
    List<AccessRequest> findByRequester(User requester);
    List<AccessRequest> findByState(RequestState state);
}
\`\`\`

### ServiceNow GlideRecord
\`\`\`javascript
// Query by requester
var gr = new GlideRecord('x_itam_access_request');
gr.addQuery('requester', requesterId);
gr.query();
while (gr.next()) {
    // Process records
}

// Query by state
var gr = new GlideRecord('x_itam_access_request');
gr.addQuery('state', 'pending');
gr.query();
\`\`\`

## Script Includes (Services)

### Spring Boot Service
\`\`\`java
@Service
public class AccessRequestService {
    
    @Autowired
    private AccessRequestRepository repository;
    
    public AccessRequest createRequest(AccessRequestDTO dto) {
        AccessRequest request = new AccessRequest();
        request.setRequester(dto.getRequester());
        request.setState(RequestState.DRAFT);
        return repository.save(request);
    }
}
\`\`\`

### ServiceNow Script Include
\`\`\`javascript
var AccessRequestService = Class.create();
AccessRequestService.prototype = {
    initialize: function() {},
    
    createRequest: function(data) {
        var gr = new GlideRecord('x_itam_access_request');
        gr.initialize();
        gr.requester = data.requester;
        gr.state = 'draft';
        return gr.insert();
    },
    
    type: 'AccessRequestService'
};
\`\`\`

## Business Rules (Validation/Lifecycle)

### Spring Boot Entity Listener
\`\`\`java
@Entity
@EntityListeners(AccessRequestListener.class)
public class AccessRequest {
    // ...
}

public class AccessRequestListener {
    @PrePersist
    public void beforeInsert(AccessRequest request) {
        if (request.getState() == null) {
            request.setState(RequestState.DRAFT);
        }
    }
    
    @PostUpdate
    public void afterUpdate(AccessRequest request) {
        if (request.getState() == RequestState.APPROVED) {
            // Send notification
        }
    }
}
\`\`\`

### ServiceNow Business Rule
\`\`\`javascript
// Before Insert Business Rule
(function executeRule(current, previous) {
    if (!current.state) {
        current.state = 'draft';
    }
})(current, previous);

// After Update Business Rule
(function executeRule(current, previous) {
    if (current.state == 'approved' && previous.state != 'approved') {
        // Send notification
        gs.eventQueue('request.approved', current, current.requester, '');
    }
})(current, previous);
\`\`\`

## REST APIs

### Spring Boot Controller
\`\`\`java
@RestController
@RequestMapping("/api/requests")
public class AccessRequestController {
    
    @Autowired
    private AccessRequestService service;
    
    @GetMapping
    public ResponseEntity<List<AccessRequest>> getRequests() {
        return ResponseEntity.ok(service.getAllRequests());
    }
    
    @PostMapping
    public ResponseEntity<AccessRequest> createRequest(@RequestBody AccessRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.createRequest(dto));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AccessRequest> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRequest(id));
    }
}
\`\`\`

### ServiceNow Scripted REST API
\`\`\`javascript
// GET /api/itam/v1/requests
(function process(request, response) {
    var gr = new GlideRecord('x_itam_access_request');
    gr.query();
    
    var items = [];
    while (gr.next()) {
        items.push({
            id: gr.sys_id.toString(),
            state: gr.state.toString()
        });
    }
    
    response.setStatus(200);
    response.setBody({ success: true, data: items });
})(request, response);

// POST /api/itam/v1/requests
(function process(request, response) {
    var data = request.body.data;
    var service = new AccessRequestService();
    var id = service.createRequest(data);
    
    response.setStatus(201);
    response.setBody({ success: true, data: { id: id } });
})(request, response);
\`\`\`

## Security (ACLs)

### Spring Boot Security
\`\`\`java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/admin/**").hasRole("ADMIN")
            .antMatchers("/api/requests/**").hasRole("EMPLOYEE")
            .anyRequest().authenticated();
    }
}
\`\`\`

### ServiceNow ACLs
\`\`\`javascript
// Table ACL for x_itam_access_request
{
    operation: 'read',
    roles: 'employee',
    script: 'answer = true;'
}

// Table ACL for admin operations
{
    operation: 'write',
    roles: 'admin,fulfiller',
    script: 'answer = gs.hasRole("admin") || gs.hasRole("fulfiller");'
}
\`\`\`

## Scheduled Tasks

### Spring Boot Scheduled Task
\`\`\`java
@Component
public class AccessExpirationJob {
    
    @Scheduled(cron = "0 0 2 * * *") // Daily at 2 AM
    public void checkExpiringAccess() {
        // Check and notify expiring access
    }
}
\`\`\`

### ServiceNow Scheduled Script Execution
\`\`\`javascript
// Daily at 2 AM
(function() {
    var gr = new GlideRecord('x_itam_assignment');
    var today = new GlideDateTime();
    var thirtyDaysFromNow = new GlideDateTime();
    thirtyDaysFromNow.addDaysLocalTime(30);
    
    gr.addQuery('expires_at', '>=', today);
    gr.addQuery('expires_at', '<=', thirtyDaysFromNow);
    gr.addQuery('state', 'active');
    gr.query();
    
    while (gr.next()) {
        // Send expiration notification
        gs.eventQueue('access.expiring', gr, gr.user, '');
    }
})();
\`\`\`

## Key Differences

### 1. **Scripting Language**
- Spring Boot: Java (compiled, strongly typed)
- ServiceNow: JavaScript (interpreted, dynamically typed on server)

### 2. **Data Access**
- Spring Boot: JPA/Hibernate with SQL
- ServiceNow: GlideRecord with platform abstraction

### 3. **Security Model**
- Spring Boot: Role-based with annotations
- ServiceNow: ACL-based with scripts

### 4. **Deployment**
- Spring Boot: JAR/WAR to application server
- ServiceNow: Update sets to instance

### 5. **Development Environment**
- Spring Boot: Local IDE (IntelliJ, Eclipse)
- ServiceNow: Web-based Studio or VS Code with extension

## Best Practices

### 1. **Separation of Concerns**
Both platforms benefit from clean architecture:
- Use Script Includes (Services) for business logic
- Use Business Rules for simple validations
- Keep REST APIs thin (delegate to services)

### 2. **Testing**
- Spring Boot: JUnit, Mockito
- ServiceNow: ATF (Automated Test Framework), Jasmine

### 3. **Error Handling**
- Spring Boot: Try-catch with @ControllerAdvice
- ServiceNow: Try-catch with gs.error() logging

### 4. **Transactions**
- Spring Boot: @Transactional
- ServiceNow: Automatic transaction management with GlideRecord

## Learning Path

1. **Understand GlideRecord** - Similar to JPA but platform-specific
2. **Master Script Includes** - Your service layer
3. **Learn Business Rules** - Like JPA listeners but more powerful
4. **Explore Flow Designer** - Visual workflow (like Spring Batch/Integration)
5. **Study ACLs** - Security model (like Spring Security but declarative)
6. **Practice REST APIs** - Similar concepts, different implementation

## Resources

- [ServiceNow Developer Portal](https://developer.servicenow.com)
- [ServiceNow Product Documentation](https://docs.servicenow.com)
- [ServiceNow Community](https://community.servicenow.com)
- [ServiceNow Learning](https://nowlearning.servicenow.com)

---

**Remember**: ServiceNow is a platform, not just a framework. Think "configuration + code" rather than "code-only".
