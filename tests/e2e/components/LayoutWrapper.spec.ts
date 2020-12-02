/// <reference types="cypress" />

import { CREATE_CAUSE_PATH, PRICING_PATH } from "./../../../helpers/paths";
import { SET_CURRENT_USER_SUCCESS } from "../../../redux/action-types/user/currentUser";

export default () => {
  describe("Banner section", () => {
    it("should close the banner", () => {
      cy.visit("/");

      const banner = cy.get("[data-cy=banner]");

      banner.should("be.visible");
      banner.find(".ant-btn").click();

      banner.should("not.be.exist");
    });
  });

  describe("Header section", () => {
    it("should open signin modal", () => {
      const getSigninBtn = cy.get(":nth-child(3) > .ant-btn");
      getSigninBtn.children("span").should("be.visible.and.contain", "SIGN IN");

      getSigninBtn.click();
      cy.get(".ant-modal-header").should("be.visible");
    });

    it("should open signup modal", () => {
      cy.get(".ant-modal-close-x").click();
      const getSignupBtn = cy.get(".ant-row > :nth-child(4) > .ant-btn");
      getSignupBtn.children("span").should("be.visible.and.contain", "SIGN UP");

      getSignupBtn.click();
      cy.get(".ant-modal-header").should("be.visible");
    });

    it("should create a new cause", () => {
      cy.visit(PRICING_PATH);
      const apiUrl = Cypress.env("NEXT_PUBLIC_SAVE_API_URL");

      cy.fixture("loginResponse.json").then((payload) => {
        localStorage.setItem("save-token", payload.data.token);

        cy.intercept("GET", `${apiUrl}/user`, {
          fixture: "loginResponse.json",
        });

        cy.window().its("store").invoke("dispatch", {
          payload: payload.data,
          type: SET_CURRENT_USER_SUCCESS,
        });

        cy.window()
          .its("store")
          .invoke("getState")
          .then(() => {
            const getNewCauseBtn = cy.get(":nth-child(2) > .ant-btn");
            getNewCauseBtn
              .children("span")
              .should("be.visible.and.contain", "Create a cause");
            getNewCauseBtn.click();

            cy.wait(3000).location("pathname").should("eq", CREATE_CAUSE_PATH);
          });
      });
    });
  });
};
