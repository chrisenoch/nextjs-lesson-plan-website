//import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/dom";
import { AddJob } from "@/components/jobs/AddJob";
import { render } from "@/test-utils/render";
import userEvent from "@testing-library/user-event";
let jobTitle: HTMLInputElement | null = null;
let jobLocation: HTMLInputElement | null = null;
let jobCompany: HTMLInputElement | null = null;
let jobSalary: HTMLInputElement | null = null;
let jobDescription: HTMLInputElement | null = null;
let submitButton: HTMLButtonElement | null = null;

beforeEach(() => {
  render(<AddJob />);
  jobTitle = screen.getByTestId("jobTitle") as HTMLInputElement;
  jobLocation = screen.getByTestId("jobLocation") as HTMLInputElement;
  jobCompany = screen.getByTestId("jobCompany") as HTMLInputElement;
  jobSalary = screen.getByTestId("jobSalary") as HTMLInputElement;
  jobDescription = screen.getByTestId("jobDescription") as HTMLInputElement;
  submitButton = screen.getByTestId("addJobSubmitButton") as HTMLButtonElement;
});

describe("helper-text shows on click and disappears on valid", () => {
  test("jobTitle - (valid with 2 characters)", async () => {
    await userEvent.click(jobTitle!);
    expect(document.getElementById("jobTitle-helper-text")).toBeInTheDocument();
    fireEvent.change(jobTitle!, { target: { value: "123" } });
    expect(
      document.getElementById("jobTitle-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobLocation - (valid with 2 characters)", async () => {
    await userEvent.click(jobLocation!);
    expect(
      document.getElementById("jobLocation-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(jobLocation!, { target: { value: "123" } });
    expect(
      document.getElementById("jobLocation-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobCompany - (valid with 2 characters)", async () => {
    await userEvent.click(jobCompany!);
    expect(
      document.getElementById("jobCompany-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(jobCompany!, { target: { value: "123" } });
    expect(
      document.getElementById("jobCompany-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobSalary - (valid with 4 characters)", async () => {
    await userEvent.click(jobSalary!);
    expect(
      document.getElementById("jobSalary-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(jobSalary!, { target: { value: "1234" } });
    expect(
      document.getElementById("jobSalary-helper-text")
    ).not.toBeInTheDocument();
  });
  test("jobDescription - (valid with 2 characters)", async () => {
    await userEvent.click(jobDescription!);
    expect(
      document.getElementById("jobDescription-helper-text")
    ).toBeInTheDocument();
    fireEvent.change(jobDescription!, { target: { value: "123" } });
    expect(
      document.getElementById("jobDescription-helper-text")
    ).not.toBeInTheDocument();
  });
});

describe("button is disabled if form is not valid", () => {
  beforeEach(() => {
    fireEvent.change(jobTitle!, {
      target: { value: "123" },
    });
    fireEvent.change(jobLocation!, {
      target: { value: "123" },
    });
    fireEvent.change(jobCompany!, {
      target: { value: "123" },
    });

    fireEvent.change(jobDescription!, {
      target: { value: "123" },
    });
  });

  test("button is disabled if all fields are valid except job salary", () => {
    fireEvent.change(jobSalary!, {
      target: { value: "123" },
    });
    expect(submitButton).toHaveAttribute("disabled");
  });
  test("button is enabled if all fields are valid", async () => {
    fireEvent.change(jobSalary!, {
      target: { value: "1234" },
    });
    expect(submitButton).not.toHaveAttribute("disabled");
  });
});

describe("spaces do not validate the form", () => {
  test("button is disabled if every field has seven spaces", async () => {
    fireEvent.change(jobTitle!, {
      target: { value: "ffffff" },
    });
    fireEvent.change(jobLocation!, {
      target: { value: "ffffff" },
    });
    fireEvent.change(jobCompany!, {
      target: { value: "ffffff" },
    });
    fireEvent.change(jobSalary!, {
      target: { value: "ffffff" },
    });
    fireEvent.change(jobDescription!, {
      target: { value: "ffffff" },
    });
    expect(submitButton).not.toHaveAttribute("disabled");
  });
});

// describe("learning testing", () => {
//   test("onChange was called", async () => {
//     const onChange = jest.fn();
//     render(<input type="checkbox" onChange={onChange} />);
//     const checkbox = screen.getByRole("checkbox");
//     await userEvent.click(checkbox);
//     expect(onChange).toHaveBeenCalledTimes(1);
//     expect(checkbox).toBeChecked();
//   });
// });

// describe("learning testing", () => {
//   test("click was called twice", async () => {
//     const spy = jest.fn();
//     submitButton!.addEventListener("click", spy);
//     await userEvent.click(submitButton!);
//     await userEvent.click(submitButton!);
//     expect(spy).toHaveBeenCalledTimes(2);
//   });

//   test("submit was called once", async () => {
//     //expect(screen.getByTestId("hello")).toBeUndefined;
//     expect(screen.queryByTestId("hello")).not.toBeInTheDocument();
//     const spy = jest.fn();
//     const addJobForm = screen.getByTestId("addJobForm") as HTMLInputElement;
//     addJobForm!.addEventListener("submit", spy);
//     await userEvent.click(submitButton!);
//     expect(spy).toHaveBeenCalledTimes(1);
//   });
//});
