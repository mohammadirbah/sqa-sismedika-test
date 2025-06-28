## Automation Testing (Bonus / Untuk Posisi Automation QA)

///<reference  types = "cypress"/>

it("Login witn empty credentials", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('button[type="submit"]').click();
  cy.get(":nth-child(2) > .oxd-input-group > .oxd-text"),
    cy
      .get(":nth-child(3) > .oxd-input-group > .oxd-text")
      .should("be.visible")
      .log("Credentials cannot be empty");
});

it("Login with invalid credentials (wrong username)", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('[name="username"]').type("Irbah"),
    cy.get('[name="password"]').type("admin123"),
    cy.get('button[type="submit"]').click(),
    cy
      .get(".oxd-alert-content > .oxd-text")
      .should("be.visible")
      .log("Login to this site is failed");
});

it("Login with valid credentials", () => {
  cy.visit(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  cy.get('[name="username"]').type("Admin"),
    cy.get('[name="password"]').type("admin123"),
    cy.get('button[type="submit"]').click(),
    cy
      .get('img[alt="client brand banner"]')
      .should("be.visible")
      .log("Login to this site is successful");
});
