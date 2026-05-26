"use client";

import { useCallback, useId, useState } from "react";
import {
  EMAIL_SUBJECT,
  EMAIL_TO,
  GROUND_OPTIONS,
  MIN_GROUNDS,
  PLANNING_APPS_EMAIL,
  PLANNING_OFFICER,
  RELATIONSHIP_OPTIONS,
  generateObjectionLetter,
  type GroundId,
  type LetterFormData,
  type Relationship,
} from "@/lib/generateLetter";

export default function ObjectionForm() {
  const formId = useId();
  const groundsHintId = `${formId}-grounds-hint`;
  const groundsErrorId = `${formId}-grounds-error`;
  const outputId = `${formId}-letter-output`;

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [relationship, setRelationship] = useState<Relationship | "">("");
  const [selectedGrounds, setSelectedGrounds] = useState<Set<GroundId>>(
    new Set(),
  );
  const [letter, setLetter] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  const toggleGround = (id: GroundId) => {
    setSelectedGrounds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setFormError(null);
  };

  const validate = (): LetterFormData | null => {
    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return null;
    }
    if (!address.trim()) {
      setFormError("Please enter your full residential address.");
      return null;
    }
    if (!relationship) {
      setFormError("Please select your relationship to the site.");
      return null;
    }
    if (selectedGrounds.size < MIN_GROUNDS) {
      setFormError(
        `Please select at least ${MIN_GROUNDS} grounds for objection.`,
      );
      return null;
    }
    setFormError(null);
    return {
      fullName: fullName.trim(),
      address: address.trim(),
      relationship,
      grounds: Array.from(selectedGrounds),
    };
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const data = validate();
    if (!data) return;
    const generated = generateObjectionLetter(data);
    setLetter(generated);
    setCopyStatus("idle");
    requestAnimationFrame(() => {
      document.getElementById(outputId)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const handleCopy = useCallback(async () => {
    if (!letter) return;
    try {
      await navigator.clipboard.writeText(letter);
      setCopyStatus("success");
    } catch {
      setCopyStatus("error");
    }
  }, [letter]);

  const mailtoHref = letter
    ? `mailto:${EMAIL_TO}?subject=${encodeURIComponent(EMAIL_SUBJECT)}&body=${encodeURIComponent(letter)}`
    : undefined;

  return (
    <>
      <form
        onSubmit={handleGenerate}
        className="space-y-10"
        aria-describedby={formError ? `${formId}-form-error` : undefined}
        noValidate
      >
        <div className="space-y-6">
          <div>
            <label htmlFor={`${formId}-name`} className="form-label">
              Full name
            </label>
            <input
              id={`${formId}-name`}
              name="fullName"
              type="text"
              autoComplete="name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              aria-invalid={formError === "Please enter your full name."}
            />
          </div>

          <div>
            <label htmlFor={`${formId}-address`} className="form-label">
              Full residential address
            </label>
            <textarea
              id={`${formId}-address`}
              name="address"
              rows={4}
              autoComplete="street-address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input form-input-textarea"
              aria-invalid={
                formError === "Please enter your full residential address."
              }
            />
          </div>

          <div>
            <label htmlFor={`${formId}-relationship`} className="form-label">
              Relationship to the site
            </label>
            <select
              id={`${formId}-relationship`}
              name="relationship"
              required
              value={relationship}
              onChange={(e) =>
                setRelationship(e.target.value as Relationship | "")
              }
              className="form-input"
              aria-invalid={
                formError === "Please select your relationship to the site."
              }
            >
              <option value="">Select an option…</option>
              {RELATIONSHIP_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <fieldset
          className="rounded-2xl border border-egra-border bg-white p-6 sm:p-8"
          aria-describedby={`${groundsHintId} ${groundsErrorId}`}
        >
          <legend className="section-heading px-1">Grounds for objection</legend>
          <p id={groundsHintId} className="mb-6 mt-3 text-sm leading-relaxed text-egra-muted">
            Select at least {MIN_GROUNDS} concerns. Each selection adds a
            detailed paragraph to your letter so every submission is unique.
          </p>
          <ul className="space-y-3" role="list">
            {GROUND_OPTIONS.map((ground) => (
              <li key={ground.id}>
                <label className="flex cursor-pointer gap-3 rounded-xl p-3 transition-colors hover:bg-egra-light/30 has-[:focus-visible]:bg-egra-light/30">
                  <input
                    type="checkbox"
                    name="grounds"
                    value={ground.id}
                    checked={selectedGrounds.has(ground.id)}
                    onChange={() => toggleGround(ground.id)}
                    className="mt-1 h-5 w-5 shrink-0 rounded accent-egra-accent"
                    aria-describedby={groundsHintId}
                  />
                  <span className="text-sm leading-relaxed text-egra-dark">
                    {ground.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {selectedGrounds.size > 0 && selectedGrounds.size < MIN_GROUNDS && (
            <p
              id={groundsErrorId}
              className="mt-4 text-sm text-egra-accent"
              role="status"
            >
              {MIN_GROUNDS - selectedGrounds.size} more selection
              {MIN_GROUNDS - selectedGrounds.size === 1 ? "" : "s"} required.
            </p>
          )}
        </fieldset>

        {formError && (
          <p
            id={`${formId}-form-error`}
            className="rounded-2xl border border-egra-accent/30 bg-egra-light/50 px-5 py-4 text-sm text-egra-dark"
            role="alert"
          >
            {formError}
          </p>
        )}

        <button type="submit" className="btn-primary w-full sm:w-auto">
          Generate Objection
        </button>
      </form>

      {letter && (
        <section
          id={outputId}
          className="mt-16 border-t border-egra-border pt-16"
          aria-labelledby={`${formId}-output-heading`}
        >
          <h2 id={`${formId}-output-heading`} className="section-heading mb-3">
            Your objection letter
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-egra-muted">
            Review the letter below. You may regenerate to receive different
            wording, then copy or email it to the planning officer.
          </p>
          <textarea
            readOnly
            value={letter}
            rows={24}
            className="form-input form-input-textarea mb-8 font-sans text-sm leading-loose"
            aria-label="Generated objection letter"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleCopy}
                className="btn-secondary"
              >
                Copy to Clipboard
              </button>
              <address
                className="not-italic text-sm leading-relaxed text-egra-dark"
                aria-label="Planning officer contact details"
              >
                <span className="mb-2 block font-bold text-egra-dark">
                  Planning officer
                </span>
                {PLANNING_OFFICER.name}
                <br />
                {PLANNING_OFFICER.role}
                <br />
                {PLANNING_OFFICER.authority}
                <br />
                {PLANNING_OFFICER.lines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
                <a
                  href={`mailto:${PLANNING_OFFICER.email}`}
                  className="link-accent mt-2 inline-block"
                >
                  {PLANNING_OFFICER.email}
                </a>
                <br />
                <a
                  href={`mailto:${PLANNING_APPS_EMAIL}`}
                  className="link-accent mt-1 inline-block"
                >
                  {PLANNING_APPS_EMAIL}
                </a>
              </address>
            </div>
            <a href={mailtoHref} className="btn-primary sm:mt-0">
              Email Planning Officer directly
            </a>
          </div>
          {copyStatus === "success" && (
            <p className="mt-4 text-sm text-egra-dark" role="status">
              Letter copied to clipboard.
            </p>
          )}
          {copyStatus === "error" && (
            <p className="mt-4 text-sm text-egra-accent" role="alert">
              Could not copy automatically. Please select the text above and
              copy manually.
            </p>
          )}
        </section>
      )}
    </>
  );
}
