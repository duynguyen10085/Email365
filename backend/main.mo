import AccessControl "authorization/access-control";
import Principal "mo:base/Principal";
import OrderedMap "mo:base/OrderedMap";
import Debug "mo:base/Debug";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Iter "mo:base/Iter";

persistent actor {
  // Initialize the user system state
  let accessControlState = AccessControl.initState();

  // Initialize auth (first caller becomes admin, others become users)
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    // Admin-only check happens inside assignRole
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    preferences : UserPreferences;
  };

  public type UserPreferences = {
    darkMode : Bool;
    language : Text;
    notificationSettings : NotificationSettings;
    preferredCategories : [Text];
  };

  public type NotificationSettings = {
    emailNotifications : Bool;
    pushNotifications : Bool;
  };

  public type Email = {
    id : Text;
    sender : Text;
    subject : Text;
    snippet : Text;
    timestamp : Time.Time;
    category : EmailCategory;
    isRead : Bool;
    isStarred : Bool;
    hasAttachments : Bool;
  };

  public type EmailCategory = {
    #inbox;
    #priority;
    #personalFinance;
    #admin;
    #newsletter;
    #spam;
    #starred;
    #unread;
    #archived;
    #sent;
    #drafts;
    #trash;
  };

  public type SortingRule = {
    id : Text;
    name : Text;
    conditions : [RuleCondition];
    actions : [RuleAction];
    order : Nat;
    isActive : Bool;
  };

  public type RuleCondition = {
    #senderContains : Text;
    #subjectContains : Text;
    #bodyContains : Text;
    #hasAttachments : Bool;
    #isUnread : Bool;
  };

  public type RuleAction = {
    #moveToCategory : EmailCategory;
    #markAsRead;
    #starEmail;
    #archiveEmail;
  };

  public type CategoryLabel = {
    id : Text;
    name : Text;
    color : Text;
    isCustom : Bool;
  };

  public type HelpQuestion = {
    id : Text;
    question : Text;
    answer : Text;
    category : Text;
  };

  public type DemoData = {
    emails : [Email];
    rules : [SortingRule];
    categories : [CategoryLabel];
  };

  public type FeatureCard = {
    id : Text;
    title : Text;
    description : Text;
    icon : Text;
    isActive : Bool;
  };

  public type Testimonial = {
    id : Text;
    name : Text;
    jobTitle : Text;
    company : Text;
    photoUrl : Text;
    story : Text;
    useCase : Text;
    results : Text;
  };

  public type SecurityChecklistItem = {
    id : Text;
    title : Text;
    description : Text;
    isCompliant : Bool;
  };

  public type Integration = {
    id : Text;
    name : Text;
    logoUrl : Text;
    status : Text;
    integrationType : Text;
  };

  public type FaqCategory = {
    id : Text;
    name : Text;
    description : Text;
  };

  public type NewsletterSubscription = {
    email : Text;
    isSubscribed : Bool;
    timestamp : Time.Time;
  };

  public type ContactFormSubmission = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  public type SuggestedCategory = {
    id : Text;
    name : Text;
    description : Text;
  };

  // New type for homepage toggle state
  public type HomepageToggleState = {
    isActive : Bool;
    lastUpdated : Time.Time;
  };

  // New type for Google account link state
  public type GoogleLinkState = {
    isLinked : Bool;
    lastUpdated : Time.Time;
  };

  transient let principalMap = OrderedMap.Make<Principal>(Principal.compare);
  transient let textMap = OrderedMap.Make<Text>(Text.compare);

  var userProfiles = principalMap.empty<UserProfile>();
  var userEmails = principalMap.empty<[Email]>();
  var userRules = principalMap.empty<[SortingRule]>();
  var userCategories = principalMap.empty<[CategoryLabel]>();
  var helpQuestions = textMap.empty<HelpQuestion>();
  var featureCards = textMap.empty<FeatureCard>();
  var testimonials = textMap.empty<Testimonial>();
  var securityChecklist = textMap.empty<SecurityChecklistItem>();
  var integrations = textMap.empty<Integration>();
  var faqCategories = textMap.empty<FaqCategory>();
  var newsletterSubscriptions = textMap.empty<NewsletterSubscription>();
  var contactFormSubmissions = textMap.empty<ContactFormSubmission>();
  var homepageToggleStates = principalMap.empty<HomepageToggleState>();
  var googleLinkStates = principalMap.empty<GoogleLinkState>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access profiles");
    };
    principalMap.get(userProfiles, caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Debug.trap("Unauthorized: Can only view your own profile");
    };
    principalMap.get(userProfiles, user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles := principalMap.put(userProfiles, caller, profile);
  };

  public query ({ caller }) func getEmails() : async [Email] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access emails");
    };
    switch (principalMap.get(userEmails, caller)) {
      case (?emails) { emails };
      case null { [] };
    };
  };

  public shared ({ caller }) func saveEmails(emails : [Email]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save emails");
    };
    userEmails := principalMap.put(userEmails, caller, emails);
  };

  public query ({ caller }) func getSortingRules() : async [SortingRule] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access sorting rules");
    };
    switch (principalMap.get(userRules, caller)) {
      case (?rules) { rules };
      case null { [] };
    };
  };

  public shared ({ caller }) func saveSortingRules(rules : [SortingRule]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save sorting rules");
    };
    userRules := principalMap.put(userRules, caller, rules);
  };

  public query ({ caller }) func getCategories() : async [CategoryLabel] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access categories");
    };
    switch (principalMap.get(userCategories, caller)) {
      case (?categories) { categories };
      case null { [] };
    };
  };

  public shared ({ caller }) func saveCategories(categories : [CategoryLabel]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can save categories");
    };
    userCategories := principalMap.put(userCategories, caller, categories);
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getHelpQuestions() : async [HelpQuestion] {
    Iter.toArray(textMap.vals(helpQuestions));
  };

  public shared ({ caller }) func addHelpQuestion(question : HelpQuestion) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add help questions");
    };
    helpQuestions := textMap.put(helpQuestions, question.id, question);
  };

  // Public query - accessible to all users including guests (for demo on landing page)
  public query func getDemoData() : async DemoData {
    let demoEmails = [
      {
        id = "1";
        sender = "john@example.com";
        subject = "Welcome to the demo!";
        snippet = "This is a sample email for the demo.";
        timestamp = Time.now();
        category = #inbox;
        isRead = false;
        isStarred = false;
        hasAttachments = false;
      },
      {
        id = "2";
        sender = "finance@bank.com";
        subject = "Your monthly statement";
        snippet = "Please find your monthly statement attached.";
        timestamp = Time.now();
        category = #personalFinance;
        isRead = false;
        isStarred = false;
        hasAttachments = true;
      },
    ];

    let demoRules = [
      {
        id = "1";
        name = "Finance emails";
        conditions = [#senderContains("bank.com")];
        actions = [#moveToCategory(#personalFinance)];
        order = 1;
        isActive = true;
      },
    ];

    let demoCategories = [
      {
        id = "1";
        name = "Priority";
        color = "#FF5733";
        isCustom = false;
      },
      {
        id = "2";
        name = "Personal Finance";
        color = "#33C1FF";
        isCustom = false;
      },
    ];

    {
      emails = demoEmails;
      rules = demoRules;
      categories = demoCategories;
    };
  };

  public shared ({ caller }) func updateEmailCategory(emailId : Text, newCategory : EmailCategory) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update email categories");
    };

    switch (principalMap.get(userEmails, caller)) {
      case (?emails) {
        let updatedEmails = List.map<Email, Email>(
          List.fromArray(emails),
          func(email) {
            if (email.id == emailId) {
              {
                id = email.id;
                sender = email.sender;
                subject = email.subject;
                snippet = email.snippet;
                timestamp = email.timestamp;
                category = newCategory;
                isRead = email.isRead;
                isStarred = email.isStarred;
                hasAttachments = email.hasAttachments;
              };
            } else {
              email;
            };
          },
        );
        userEmails := principalMap.put(userEmails, caller, List.toArray(updatedEmails));
      };
      case null {
        Debug.trap("No emails found for user");
      };
    };
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getFeatureCards() : async [FeatureCard] {
    Iter.toArray(textMap.vals(featureCards));
  };

  public shared ({ caller }) func initializeFeatureCards() : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can initialize feature cards");
    };

    let cards = [
      {
        id = "priority-categories";
        title = "Priority Categories";
        description = "Automatically sort emails into priority categories for better organization.";
        icon = "priority";
        isActive = true;
      },
      {
        id = "push-emergency-notification";
        title = "Push Emergency Notification";
        description = "Urgent messages trigger instant push notifications to your phone.";
        icon = "notification";
        isActive = true;
      },
      {
        id = "summary-weekly-report";
        title = "Summary Weekly Report";
        description = "Receive a weekly summary of your inbox activity and highlights.";
        icon = "report";
        isActive = true;
      },
    ];

    var newFeatureCards = textMap.empty<FeatureCard>();
    for (card in cards.vals()) {
      newFeatureCards := textMap.put(newFeatureCards, card.id, card);
    };
    featureCards := newFeatureCards;
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getTestimonials() : async [Testimonial] {
    Iter.toArray(textMap.vals(testimonials));
  };

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add testimonials");
    };
    testimonials := textMap.put(testimonials, testimonial.id, testimonial);
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getSecurityChecklist() : async [SecurityChecklistItem] {
    Iter.toArray(textMap.vals(securityChecklist));
  };

  public shared ({ caller }) func addSecurityChecklistItem(item : SecurityChecklistItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add security checklist items");
    };
    securityChecklist := textMap.put(securityChecklist, item.id, item);
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getIntegrations() : async [Integration] {
    Iter.toArray(textMap.vals(integrations));
  };

  public shared ({ caller }) func addIntegration(integration : Integration) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add integrations");
    };
    integrations := textMap.put(integrations, integration.id, integration);
  };

  // Public query - accessible to all users including guests (for landing page)
  public query func getFaqCategories() : async [FaqCategory] {
    Iter.toArray(textMap.vals(faqCategories));
  };

  public shared ({ caller }) func addFaqCategory(category : FaqCategory) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Debug.trap("Unauthorized: Only admins can add FAQ categories");
    };
    faqCategories := textMap.put(faqCategories, category.id, category);
  };

  // Public function - accessible to all users including guests (for newsletter signup on landing page)
  public shared func subscribeToNewsletter(email : Text) : async () {
    let subscription = {
      email;
      isSubscribed = true;
      timestamp = Time.now();
    };
    newsletterSubscriptions := textMap.put(newsletterSubscriptions, email, subscription);
  };

  // Public function - accessible to all users including guests (for contact form on landing page)
  public shared func submitContactForm(name : Text, email : Text, message : Text) : async () {
    let submission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactFormSubmissions := textMap.put(contactFormSubmissions, email, submission);
  };

  // Public query - accessible to all users including guests (for settings page)
  public query func getSuggestedCategories() : async [SuggestedCategory] {
    [
      {
        id = "priority";
        name = "Priority";
        description = "High importance emails that require immediate attention.";
      },
      {
        id = "personal-finance";
        name = "Personal Finance";
        description = "Bank statements, bills, and financial documents.";
      },
      {
        id = "admin";
        name = "Admin";
        description = "Administrative emails and important notices.";
      },
      {
        id = "newsletter";
        name = "Newsletter";
        description = "Subscribed newsletters and promotional emails.";
      },
      {
        id = "spam";
        name = "Spam";
        description = "Unwanted or suspicious emails.";
      },
      {
        id = "social";
        name = "Social";
        description = "Social media notifications and updates.";
      },
      {
        id = "updates";
        name = "Updates";
        description = "Product updates, release notes, and announcements.";
      },
    ];
  };

  public shared ({ caller }) func updatePreferredCategories(preferredCategories : [Text]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can update preferred categories");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (?profile) {
        let updatedPreferences = {
          darkMode = profile.preferences.darkMode;
          language = profile.preferences.language;
          notificationSettings = profile.preferences.notificationSettings;
          preferredCategories;
        };

        let updatedProfile = {
          name = profile.name;
          email = profile.email;
          preferences = updatedPreferences;
        };

        userProfiles := principalMap.put(userProfiles, caller, updatedProfile);
      };
      case null {
        Debug.trap("User profile not found");
      };
    };
  };

  public query ({ caller }) func getPreferredCategories() : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access preferred categories");
    };

    switch (principalMap.get(userProfiles, caller)) {
      case (?profile) {
        profile.preferences.preferredCategories;
      };
      case null {
        [];
      };
    };
  };

  // New functions for homepage toggle state

  public query ({ caller }) func getHomepageToggleState() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access homepage toggle state");
    };

    switch (principalMap.get(homepageToggleStates, caller)) {
      case (?state) { state.isActive };
      case null { false };
    };
  };

  public shared ({ caller }) func setHomepageToggleState(isActive : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can set homepage toggle state");
    };

    let newState = {
      isActive;
      lastUpdated = Time.now();
    };

    homepageToggleStates := principalMap.put(homepageToggleStates, caller, newState);
  };

  // New function to toggle homepage state
  public shared ({ caller }) func toggleHomepageState() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can toggle homepage state");
    };

    let currentState = switch (principalMap.get(homepageToggleStates, caller)) {
      case (?state) { state.isActive };
      case null { false };
    };

    let newState = {
      isActive = not currentState;
      lastUpdated = Time.now();
    };

    homepageToggleStates := principalMap.put(homepageToggleStates, caller, newState);
    newState.isActive;
  };

  // New functions for Google account link state

  public query ({ caller }) func getGoogleLinkState() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can access Google link state");
    };

    switch (principalMap.get(googleLinkStates, caller)) {
      case (?state) { state.isLinked };
      case null { false };
    };
  };

  public shared ({ caller }) func setGoogleLinkState(isLinked : Bool) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can set Google link state");
    };

    let newState = {
      isLinked;
      lastUpdated = Time.now();
    };

    googleLinkStates := principalMap.put(googleLinkStates, caller, newState);
  };

  // New function to toggle Google link state
  public shared ({ caller }) func toggleGoogleLinkState() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Debug.trap("Unauthorized: Only users can toggle Google link state");
    };

    let currentState = switch (principalMap.get(googleLinkStates, caller)) {
      case (?state) { state.isLinked };
      case null { false };
    };

    let newState = {
      isLinked = not currentState;
      lastUpdated = Time.now();
    };

    googleLinkStates := principalMap.put(googleLinkStates, caller, newState);
    newState.isLinked;
  };
};

