import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Nat.compare(submission1.id, submission2.id);
    };
  };

  let submissions = Map.empty<Nat, Submission>();
  var nextId = 0;

  var admin : ?Principal = null; // Store admin principal

  public shared ({ caller }) func initializeAdmin() : async () {
    switch (admin) {
      case (?_admin) { Runtime.trap("Admin has already been initialized") };
      case (null) {
        admin := ?caller;
      };
    };
  };

  public query ({ caller }) func isAdmin() : async Bool {
    switch (admin) {
      case (null) { false };
      case (?principal) { principal == caller };
    };
  };

  public shared ({ caller }) func submitForm(name : Text, email : Text, message : Text) : async () {
    assert name != "";
    assert email != "";
    assert message != "";

    let submission : Submission = {
      id = nextId;
      name;
      email;
      message;
    };

    submissions.add(nextId, submission);
    nextId += 1;
  };

  public query ({ caller }) func getSubmission(id : Nat) : async Submission {
    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Submission does not exist") };
      case (?submission) { submission };
    };
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    assert (switch (admin) {
      case (null) { false };
      case (?principal) { principal == caller };
    });

    submissions.values().toArray().sort();
  };
};
