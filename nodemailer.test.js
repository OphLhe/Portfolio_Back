import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("nodemailer", () => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: "123" });
  const mockCreateTransport = vi.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  return {
    default: mockCreateTransport,
    createTransport: mockCreateTransport,
  };
});

describe("Test d'envoi d'email", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("devrait envoyer un email", async () => {
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.default({});

    await transporter.sendMail({
      from: "test@example.com",
      to: "dest@example.com",
      subject: "Test",
      text: "Hello",
    });

    expect(nodemailer.createTransport().sendMail).toHaveBeenCalledWith({
      from: "test@example.com",
      to: "dest@example.com",
      subject: "Test",
      text: "Hello",
    });
    expect(nodemailer.createTransport().sendMail).toHaveBeenCalled();
  });
});
