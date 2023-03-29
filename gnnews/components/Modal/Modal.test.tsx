import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Modal from "./Modal";
import "@testing-library/jest-dom";

describe("Modal", () => {
  const setup = () => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");

    document.body.appendChild(modalRoot);
  };
  beforeEach(() => {
    setup();
  });
  it("renders the Modal component without errors", () => {
    const handleClose = jest.fn();
    render(
      <Modal onClose={handleClose} title="Test Modal">
        <p>Test Modal Content</p>
      </Modal>
    );
  });
  it("triggers the onClose callback when close button is clicked", () => {
    const handleClose = jest.fn();
    const renderModal = render(
      <Modal onClose={handleClose} title="Test Modal">
        <p>Test Modal Content</p>
      </Modal>
    );
    const closeButton = renderModal.getByTestId("modal-close-button");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
