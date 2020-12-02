/// <reference types="cypress" />
import { SET_CURRENT_USER_SUCCESS } from "../../../redux/action-types/user/currentUser";

export default () => {
  it("should display the homepage", () => {
    cy.visit("/");
  });

  before(() => {
    cy.stub(localStorage, "getItem").returns("fake-token");
  });

  describe("Get started Section", () => {
    it("should open signup modal", () => {
      const getStartedBtn = cy.get("button[data-cy='getStarted']");

      getStartedBtn.click();
      getStartedBtn
        .children("span")
        .should("be.visible.and.contain", "GET STARTED");
      cy.get(".ant-modal-header").should("be.visible");
    });

    it("should redirect to create a cause", () => {
      cy.fixture("loginResponse.json").then((payload) => {
        cy.get(".ant-modal-close-x").click();

        localStorage.setItem("save-token", "fake-token");

        cy.window().its("store").invoke("dispatch", {
          payload: payload.data,
          type: SET_CURRENT_USER_SUCCESS,
        });

        cy.window()
          .its("store")
          .invoke("getState")
          .then(() => {
            const getStartedBtn = cy.get("button[data-cy='getStarted']");

            getStartedBtn.click();
            getStartedBtn
              .children("span")
              .should("be.visible.and.contain", "CREATE A CAUSE");
          });
      });
    });

    it("should load as a mobile device", () => {
      cy.viewport("iphone-6");
      cy.visit("/");
    });
  });

  describe("Jumbotron Section", () => {
    it("should render join us button", () => {
      const getJoinUsBtn = cy.get("button[data-cy='joinUs']");
      getJoinUsBtn.children("span").should("be.visible.and.contain", "JOIN US");
    });

    it("should open signup modal", () => {
      const getJoinUsBtn = cy.get("button[data-cy='joinUs']");

      getJoinUsBtn.click();
      cy.get(".ant-modal-header").should("be.visible");
    });

    it("should hide join us button", () => {
      cy.fixture("loginResponse.json").then((payload) => {
        localStorage.setItem("save-token", "fake-token");

        cy.window().its("store").invoke("dispatch", {
          payload: payload.data,
          type: SET_CURRENT_USER_SUCCESS,
        });

        cy.window()
          .its("store")
          .invoke("getState")
          .then(() => {
            const getJoinUsBtn = cy.get("button[data-cy='joinUs']");
            getJoinUsBtn.should("not.exist");
          });
      });
    });
  });
};
