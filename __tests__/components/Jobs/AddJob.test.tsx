//import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/dom";
import { AddJob } from "@/components/Jobs/AddJob";
import { render } from "@/test-utils/render";
import userEvent from "@testing-library/user-event";
import { simpleDelay } from "@/utils/delay";

beforeEach(() => {
  render(<AddJob />);
});

describe("helper-text shows on click and disappears on valid", () => {
  test("jobTitle - (valid with 2 characters)", async () => {
    const input = screen.getByTestId("jobTitle") as HTMLInputElement;
    userEvent.click(input);
    await simpleDelay(300);
    expect(document.getElementById("jobTitle-helper-text")).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "123" } });
    await simpleDelay(300);
    expect(
      document.getElementById("jobTitle-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobLocation - (valid with 2 characters)", async () => {
    const input = screen.getByTestId("jobLocation") as HTMLInputElement;
    userEvent.click(input);
    await simpleDelay(300);
    expect(
      document.getElementById("jobLocation-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "123" } });
    await simpleDelay(300);
    expect(
      document.getElementById("jobLocation-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobCompany - (valid with 2 characters)", async () => {
    const input = screen.getByTestId("jobCompany") as HTMLInputElement;
    userEvent.click(input);
    await simpleDelay(300);
    expect(
      document.getElementById("jobCompany-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "123" } });
    await simpleDelay(300);
    expect(
      document.getElementById("jobCompany-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobSalary - (valid with 4 characters)", async () => {
    const input = screen.getByTestId("jobSalary") as HTMLInputElement;
    userEvent.click(input);
    await simpleDelay(300);
    expect(
      document.getElementById("jobSalary-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "1234" } });
    await simpleDelay(300);
    expect(
      document.getElementById("jobSalary-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobDescription - (valid with 2 characters)", async () => {
    const input = screen.getByTestId("jobDescription") as HTMLInputElement;
    userEvent.click(input);
    await simpleDelay(300);
    expect(
      document.getElementById("jobDescription-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(input, { target: { value: "123" } });
    await simpleDelay(300);
    expect(
      document.getElementById("jobDescription-helper-text")
    ).not.toBeInTheDocument();
  });
});

describe("button is disabled if form is not valid", () => {
  beforeEach(() => {
    fireEvent.change(screen.getByTestId("jobTitle"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByTestId("jobLocation"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByTestId("jobCompany"), {
      target: { value: "123" },
    });

    fireEvent.change(screen.getByTestId("jobDescription"), {
      target: { value: "123" },
    });
  });

  test("button is disabled if all fields are valid except job salary", async () => {
    fireEvent.change(screen.getByTestId("jobSalary"), {
      target: { value: "123" },
    });
    await simpleDelay(300);
    expect(screen.getByTestId("addJobSubmitButton")).toHaveAttribute(
      "disabled"
    );
  });
  test("button is enabled if all fields are valid", async () => {
    fireEvent.change(screen.getByTestId("jobSalary"), {
      target: { value: "1234" },
    });
    await simpleDelay(300);
    expect(screen.getByTestId("addJobSubmitButton")).not.toHaveAttribute(
      "disabled"
    );
  });
});

describe("spaces do not validate the form", () => {
  test("button is disabled if every field has seven spaces", async () => {
    fireEvent.change(screen.getByTestId("jobTitle"), {
      target: { value: "ffffff" },
    });
    fireEvent.change(screen.getByTestId("jobLocation"), {
      target: { value: "ffffff" },
    });
    fireEvent.change(screen.getByTestId("jobCompany"), {
      target: { value: "ffffff" },
    });
    fireEvent.change(screen.getByTestId("jobSalary"), {
      target: { value: "ffffff" },
    });
    fireEvent.change(screen.getByTestId("jobDescription"), {
      target: { value: "ffffff" },
    });
    await simpleDelay(300);
    expect(screen.getByTestId("addJobSubmitButton")).not.toHaveAttribute(
      "disabled"
    );
  });
});

// describe("helper-text should appear on click", () => {
//   test("jobTitle-helper-text should appear on click", async () => {
//     render(<AddJob />);
//     userEvent.click(screen.getByTestId("jobTitle"));
//     await simpleDelay(300);
//     expect(document.getElementById("jobTitle-helper-text")).toBeInTheDocument();
//   });
//   test("jobLocation-helper-text should appear on click", async () => {
//     render(<AddJob />);
//     userEvent.click(screen.getByTestId("jobLocation"));
//     await simpleDelay(300);
//     expect(
//       document.getElementById("jobLocation-helper-text")
//     ).toBeInTheDocument();
//   });
//   test("jobCompany-helper-text should appear on click", async () => {
//     render(<AddJob />);
//     userEvent.click(screen.getByTestId("jobCompany"));
//     await simpleDelay(300);
//     expect(
//       document.getElementById("jobCompany-helper-text")
//     ).toBeInTheDocument();
//   });
//   test("jobSalary-helper-text should appear on click", async () => {
//     render(<AddJob />);
//     userEvent.click(screen.getByTestId("jobSalary"));
//     await simpleDelay(300);
//     expect(
//       document.getElementById("jobSalary-helper-text")
//     ).toBeInTheDocument();
//   });
//   test("jobDescription-helper-text should appear on click", async () => {
//     render(<AddJob />);
//     userEvent.click(screen.getByTestId("jobDescription"));
//     await simpleDelay(300);
//     expect(
//       document.getElementById("jobDescription-helper-text")
//     ).toBeInTheDocument();
//   });
// });
