import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Order "mo:core/Order";



actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  public type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  public type Project = {
    id : Nat;
    title : Text;
    category : Text;
    year : Text;
    concept : Text;
    process : Text;
    coverImageId : Text;
    galleryImageIds : [Text];
  };

  module Project {
    public func compare(project1 : Project, project2 : Project) : Order.Order {
      Nat.compare(project1.id, project2.id);
    };
  };

  let projects = Map.empty<Nat, Project>();
  let submissions = Map.empty<Nat, Submission>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextProjectId = 0;
  var nextSubmissionId = 0;

  // Project management

  public shared ({ caller }) func createProject(
    title : Text,
    category : Text,
    year : Text,
    concept : Text,
    process : Text,
    coverImageId : Text,
    galleryImageIds : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create projects");
    };

    let project : Project = {
      id = nextProjectId;
      title;
      category;
      year;
      concept;
      process;
      coverImageId;
      galleryImageIds;
    };

    projects.add(nextProjectId, project);
    nextProjectId += 1;
  };

  public shared ({ caller }) func updateProject(
    id : Nat,
    title : Text,
    category : Text,
    year : Text,
    concept : Text,
    process : Text,
    coverImageId : Text,
    galleryImageIds : [Text],
  ) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update projects");
    };

    let project : Project = {
      id;
      title;
      category;
      year;
      concept;
      process;
      coverImageId;
      galleryImageIds;
    };

    projects.add(id, project);
  };

  public shared ({ caller }) func deleteProject(id : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete projects");
    };

    projects.remove(id);
  };

  // Public read access - no authentication required
  public query func getAllProjects() : async [Project] {
    projects.values().toArray().sort();
  };

  // Public read access - no authentication required
  public query func getProjectById(id : Nat) : async Project {
    switch (projects.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) { project };
    };
  };

  // Submission handling

  // Public access - anyone including anonymous users can submit
  public shared func submitForm(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
  ) : async () {
    let submission : Submission = {
      id = nextSubmissionId;
      name;
      email;
      phone;
      message;
    };

    submissions.add(nextSubmissionId, submission);
    nextSubmissionId += 1;
  };

  public query ({ caller }) func getSubmission(id : Nat) : async Submission {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };

    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Submission does not exist") };
      case (?submission) { submission };
    };
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view submissions");
    };

    submissions.values().toArray();
  };

  // User profile functions required by frontend

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
