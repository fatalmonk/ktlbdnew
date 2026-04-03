/**
 * Analytics Event Tracking
 * Comprehensive event tracking for Google Analytics 4
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

// Track events to Google Analytics (GA4)
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>,
) {
  if (
    typeof window !== "undefined" &&
    "gtag" in window &&
    typeof (window as { gtag?: unknown }).gtag === "function"
  ) {
    (
      window as {
        gtag: (
          command: string,
          targetId: string,
          config?: Record<string, unknown>,
        ) => void;
      }
    ).gtag("event", eventName, parameters);
  }

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics Event]", eventName, parameters);
  }
}

// RFQ Events
export const RFQEvents = {
  formStarted: (step: number) => {
    trackEvent("rfq_form_started", {
      event_category: "RFQ",
      step_number: step,
    });
  },

  stepCompleted: (step: number) => {
    trackEvent("rfq_step_completed", {
      event_category: "RFQ",
      step_number: step,
    });
  },

  stepAbandoned: (step: number) => {
    trackEvent("rfq_step_abandoned", {
      event_category: "RFQ",
      step_number: step,
    });
  },

  formSubmitted: (productCount: number, estimatedValue?: string) => {
    trackEvent("rfq_form_submitted", {
      event_category: "RFQ",
      product_count: productCount,
      estimated_value: estimatedValue,
    });
  },
};

// Case Study Events
export const CaseStudyEvents = {
  viewed: (caseStudyId: string, title: string) => {
    trackEvent("case_study_viewed", {
      event_category: "Case Study",
      case_study_id: caseStudyId,
      case_study_title: title,
    });
  },

  pdfDownloaded: (caseStudyId: string) => {
    trackEvent("case_study_pdf_downloaded", {
      event_category: "Download",
      case_study_id: caseStudyId,
    });
  },

  shared: (caseStudyId: string, method: string) => {
    trackEvent("case_study_shared", {
      event_category: "Share",
      case_study_id: caseStudyId,
      share_method: method,
    });
  },
};

// Certification Events
export const CertificationEvents = {
  clicked: (certificationName: string) => {
    trackEvent("certification_clicked", {
      event_category: "Certification",
      certification_name: certificationName,
    });
  },

  verified: (certificationName: string) => {
    trackEvent("certification_verified", {
      event_category: "Certification",
      certification_name: certificationName,
    });
  },

  pdfDownloaded: (certificationName: string) => {
    trackEvent("certification_pdf_downloaded", {
      event_category: "Download",
      certification_name: certificationName,
    });
  },
};

// Sustainability Events
export const SustainabilityEvents = {
  dashboardViewed: () => {
    trackEvent("sustainability_dashboard_viewed", {
      event_category: "Sustainability",
    });
  },

  reportDownloaded: (reportType: string) => {
    trackEvent("sustainability_report_downloaded", {
      event_category: "Download",
      report_type: reportType,
    });
  },

  metricClicked: (metricName: string) => {
    trackEvent("sustainability_metric_clicked", {
      event_category: "Sustainability",
      metric_name: metricName,
    });
  },
};

// Chatbot Events
export const ChatbotEvents = {
  opened: () => {
    trackEvent("chatbot_opened", {
      event_category: "Chatbot",
    });
  },

  messageSent: (messageCount: number) => {
    trackEvent("chatbot_message_sent", {
      event_category: "Chatbot",
      message_count: messageCount,
    });
  },

  actionTaken: (actionType: string, actionValue: string) => {
    trackEvent("chatbot_action_taken", {
      event_category: "Chatbot",
      action_type: actionType,
      action_value: actionValue,
    });
  },
};

// Navigation Events
export const NavigationEvents = {
  menuOpened: (menuName: string) => {
    trackEvent("navigation_menu_opened", {
      event_category: "Navigation",
      menu_name: menuName,
    });
  },

  linkClicked: (linkText: string, destination: string) => {
    trackEvent("navigation_link_clicked", {
      event_category: "Navigation",
      link_text: linkText,
      destination: destination,
    });
  },
};

// Conversion Events
export const ConversionEvents = {
  formSubmitted: (formType: string) => {
    trackEvent("form_submitted", {
      event_category: "Conversion",
      form_type: formType,
    });
  },

  contactRequested: (source: string) => {
    trackEvent("contact_requested", {
      event_category: "Conversion",
      source: source,
    });
  },
};

// Page View Tracking
export function trackPageView(path: string, title: string) {
  trackEvent("page_view", {
    page_path: path,
    page_title: title,
  });
}
