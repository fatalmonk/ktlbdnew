# Component 2.1: Serverless API Architecture

**Component ID:** 2.1  
**Layer:** Backend Architecture  
**Phase:** Backend Foundation (Weeks 3-5)  
**Priority:** High  
**Dependencies:** Component 1.2 (Build Pipeline Architecture)

---

## Component Overview

**Purpose:** Implement serverless backend API infrastructure for form submissions and email notifications

**Scope:** AWS Lambda/Vercel functions, API Gateway, RESTful endpoints, serverless deployment

**Architecture Type:** Serverless Backend Infrastructure

---

## Technical Specifications

### Serverless Architecture

```
Serverless API Infrastructure
├── API Gateway
│   ├── RESTful Endpoints
│   │   ├── POST /api/contact
│   │   ├── POST /api/inquiry
│   │   └── POST /api/newsletter
│   ├── CORS Configuration
│   ├── Rate Limiting
│   └── Security Headers
├── Lambda Functions
│   ├── Contact Handler
│   ├── Inquiry Handler
│   ├── Newsletter Handler
│   └── Shared Utilities
├── Email Service Integration
│   ├── SendGrid/AWS SES
│   ├── Email Templates
│   └── Delivery Tracking
└── Security Layer
    ├── Input Validation
    ├── Authentication
    └── Rate Limiting
```

### API Endpoint Specifications

```typescript
// Contact Form API
POST /api/contact
Content-Type: application/json

Request Body:
{
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  source: 'contact-page' | 'inquiry-form';
}

Response:
{
  success: boolean;
  message: string;
  submissionId?: string;
}

// Inquiry Form API
POST /api/inquiry
Content-Type: application/json

Request Body:
{
  name: string;
  email: string;
  company: string;
  phone?: string;
  product: string;
  quantity: number;
  message: string;
  timeline: string;
}

// Newsletter API
POST /api/newsletter
Content-Type: application/json

Request Body:
{
  email: string;
  source: string;
  consent: boolean;
}
```

---

## Implementation Requirements

### Serverless Function Structure

```
backend/
├── functions/
│   ├── contact.ts
│   ├── inquiry.ts
│   ├── newsletter.ts
│   └── shared/
│       ├── validation.ts
│       ├── email.ts
│       └── security.ts
├── lib/
│   ├── email-service.ts
│   ├── validation-schemas.ts
│   └── error-handling.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
└── config/
    ├── development.ts
    ├── staging.ts
    └── production.ts
```

### Lambda Function Implementation

```typescript
// functions/contact.ts
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { validateContactSubmission } from '../lib/validation-schemas';
import { sendContactEmail } from '../lib/email-service';
import { handleError } from '../lib/error-handling';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': 'https://ktlbd.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
      return { statusCode: 200, headers, body: '' };
    }

    // Validate request
    const body = JSON.parse(event.body || '{}');
    const validatedData = validateContactSubmission(body);

    // Send email
    await sendContactEmail(validatedData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully',
        submissionId: generateSubmissionId(),
      }),
    };
  } catch (error) {
    return handleError(error, headers);
  }
};
```

---

## Integration Requirements

### Email Service Integration

- **Provider:** SendGrid OR AWS SES
- **Templates:** HTML email templates for each form type
- **Delivery:** Real-time email delivery
- **Tracking:** Email delivery status tracking
- **Fallback:** Error handling and retry logic

### Security Integration

- **CORS:** Whitelist ktlbd.com domain only
- **Rate Limiting:** 10 requests/minute per IP
- **Input Validation:** Zod schema validation
- **Security Headers:** X-Content-Type-Options, X-Frame-Options
- **Input Sanitization:** XSS protection

### Frontend Integration

- **API Client:** Fetch API with error handling
- **Loading States:** User feedback during submission
- **Error Handling:** User-friendly error messages
- **Success Feedback:** Confirmation messages

---

## Performance Requirements

### Response Time

- **API Response:** < 500ms for all endpoints
- **Email Delivery:** < 5 seconds for email sending
- **Cold Start:** < 2 seconds for Lambda cold starts
- **Warm Start:** < 100ms for warm Lambda functions

### Scalability

- **Concurrent Requests:** Support 100+ concurrent requests
- **Auto-scaling:** Automatic scaling based on demand
- **Resource Limits:** Appropriate memory and timeout settings
- **Monitoring:** Performance monitoring and alerting

---

## Security Architecture

### Input Validation

```typescript
// validation-schemas.ts
import { z } from 'zod';

export const contactSubmissionSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(2000),
  source: z.enum(['contact-page', 'inquiry-form']),
});

export const inquirySubmissionSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().min(1).max(100),
  phone: z.string().max(20).optional(),
  product: z.string().min(1).max(100),
  quantity: z.number().min(1).max(1000000),
  message: z.string().min(1).max(2000),
  timeline: z.string().min(1).max(100),
});

export const newsletterSubscriptionSchema = z.object({
  email: z.string().email(),
  source: z.string().max(100),
  consent: z.boolean().refine((val) => val === true),
});
```

### Rate Limiting Implementation

```typescript
// security.ts
import { APIGatewayProxyEvent } from 'aws-lambda';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (event: APIGatewayProxyEvent): boolean => {
  const ip = event.requestContext.identity.sourceIp;
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 10;

  const current = rateLimitMap.get(ip);

  if (!current || now > current.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= maxRequests) {
    return false;
  }

  current.count++;
  return true;
};
```

---

## Monitoring and Observability

### Metrics

- **Request Count:** Number of API requests
- **Response Time:** API response times
- **Error Rate:** Percentage of failed requests
- **Email Delivery Rate:** Email delivery success rate

### Logging

- **Request Logging:** All API requests logged
- **Error Logging:** Detailed error information
- **Performance Logging:** Response time tracking
- **Security Logging:** Security event logging

### Alerting

- **High Error Rate:** Alert when error rate > 5%
- **Slow Response:** Alert when response time > 1s
- **Email Delivery Issues:** Alert on email delivery failures
- **Security Events:** Alert on security violations

---

## Deployment Architecture

### Environment Strategy

- **Development:** Local development environment
- **Staging:** Pre-production testing environment
- **Production:** Live production environment

### Deployment Process

1. **Code Deployment:** Serverless functions deployed via CI/CD
2. **Configuration:** Environment variables and secrets
3. **Testing:** Automated testing in staging
4. **Production:** Gradual rollout to production

### Infrastructure as Code

```yaml
# serverless.yml
service: ktl-api

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    EMAIL_SERVICE_API_KEY: ${env:EMAIL_SERVICE_API_KEY}
    CORS_ORIGIN: ${env:CORS_ORIGIN}

functions:
  contact:
    handler: functions/contact.handler
    events:
      - http:
          path: /api/contact
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: contact-template

  inquiry:
    handler: functions/inquiry.handler
    events:
      - http:
          path: /api/inquiry
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: inquiry-template

  newsletter:
    handler: functions/newsletter.handler
    events:
      - http:
          path: /api/newsletter
          method: post
          cors: true
    environment:
      EMAIL_TEMPLATE: newsletter-template
```

---

## Success Criteria

### Technical Success

- [ ] All API endpoints functional and tested
- [ ] Response time < 500ms for all endpoints
- [ ] Email delivery working reliably
- [ ] Security measures implemented

### Operational Success

- [ ] CI/CD pipeline working
- [ ] Monitoring and alerting setup
- [ ] Documentation complete
- [ ] Team training completed

### Quality Success

- [ ] Test coverage comprehensive
- [ ] Error handling robust
- [ ] Performance optimized
- [ ] Security validated

---

## Risk Assessment

### High Risk

- **Email Delivery:** Email service may have delivery issues
- **Security Vulnerabilities:** API may be vulnerable to attacks

### Medium Risk

- **Performance:** Serverless cold starts may cause delays
- **Scalability:** High traffic may cause issues

### Mitigation Strategies

- Use reputable email service with good delivery rates
- Implement comprehensive security testing
- Optimize function for fast cold starts
- Implement proper monitoring and alerting

---

## Related Components

- **Previous:** Component 1.2 (Build Pipeline Architecture)
- **Next:** Component 2.2 (Data Models Architecture)
- **Dependencies:** Component 1.2 must be completed first
- **Blocks:** Component 2.2 (Data Models Architecture)

---

**Component Status:** Ready for Implementation  
**Assigned To:** TBD  
**Created:** October 25, 2025  
**Last Updated:** October 25, 2025
