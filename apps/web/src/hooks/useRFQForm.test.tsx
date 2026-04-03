import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRFQForm } from "./useRFQForm";
import { RFQ_STORAGE_KEY } from "../modules/rfq/data/rfq.config";

describe("useRFQForm", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("does not throw when localStorage.getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Access denied", "SecurityError");
    });
    expect(() => renderHook(() => useRFQForm())).not.toThrow();
  });

  it("does not throw when localStorage.setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException(
        "The quota has been exceeded.",
        "QuotaExceededError",
      );
    });
    expect(() => renderHook(() => useRFQForm())).not.toThrow();
  });

  it("persists draft when storage is available", () => {
    const { result } = renderHook(() => useRFQForm());
    act(() => {
      result.current.updateContact({ name: "Taylor" });
    });
    const raw = localStorage.getItem(RFQ_STORAGE_KEY);
    expect(raw).toBeTruthy();
    expect(JSON.parse(raw!).contact.name).toBe("Taylor");
  });
});
