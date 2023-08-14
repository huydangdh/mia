import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AttendanceApp from "../../components/attendance/AttendanceApp";

describe("AttendanceApp", () => {
  it("should render the clock and user information", () => {
    render(<AttendanceApp />);
    const clockElement = screen.getByLabelText("Clock");
    const employeeIdInput = screen.getByLabelText("Mã nhân viên");

    expect(clockElement).toBeTruthy();
    expect(employeeIdInput).toBeTruthy();
  });

  it("should allow clocking in and display clock-in time", async () => {
    render(<AttendanceApp />);
    const clockInButton = screen.getByText("Bắt đầu làm việc");

    fireEvent.click(clockInButton);

    await waitFor(() => {
      const clockInTimeElement = screen.getByText("Bắt đầu làm việc:");
      expect(clockInTimeElement).toBeTruthy();
    });
  });

  it("should allow clocking out and display clock-out time", async () => {
    render(<AttendanceApp />);
    const clockInButton = screen.getByText("Bắt đầu làm việc");
    const clockOutButton = screen.getByText("Kết thúc làm việc");

    fireEvent.click(clockInButton);
    fireEvent.click(clockOutButton);

    await waitFor(() => {
      const clockOutTimeElement = screen.getByText("Kết thúc làm việc:");
      expect(clockOutTimeElement).toBeTruthy();
    });
  });

  it("should reset clock-in and clock-out times when reset button is clicked", async () => {
    render(<AttendanceApp />);
    const clockInButton = screen.getByText("Bắt đầu làm việc");
    const clockOutButton = screen.getByText("Kết thúc làm việc");
    const resetButton = screen.getByText("Đặt lại");

    fireEvent.click(clockInButton);
    fireEvent.click(clockOutButton);
    fireEvent.click(resetButton);

    await waitFor(() => {
      const clockInTimeElement = screen.queryByText("Bắt đầu làm việc:");
      const clockOutTimeElement = screen.queryByText("Kết thúc làm việc:");
      expect(clockInTimeElement).toBeFalsy();
      expect(clockOutTimeElement).toBeFalsy();
    });
  });

  // Add more test cases as needed
});
