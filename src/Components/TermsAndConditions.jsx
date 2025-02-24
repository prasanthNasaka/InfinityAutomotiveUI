const TermsAndConditions = () => {
  return (
    <>
      <div className="h-20 w-full flex items-center justify-center">
        <span className="text-5xl font-bold">Amon Racing</span>
      </div>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-6 relative">
        <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full p-8">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Terms and Conditions for Racing Registration
          </h2>

          <div className="space-y-6 text-gray-700">
            <p className="text-lg font-medium">
              1. <span className="font-bold">Eligibility</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To participate in this race, you must be at least 18 years of
                age or have written consent from a parent or guardian if under
                18.
              </li>
              <li>
                Participants must possess a valid driver’s license or
                appropriate racing license, if applicable.
              </li>
              <li>
                All vehicles must meet the safety standards as outlined by the
                race organizers.
              </li>
            </ul>

            <p className="text-lg font-medium">
              2. <span className="font-bold">Vehicle Requirements</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Vehicles must comply with the technical specifications,
                including safety features such as roll cages, harnesses, and
                fire extinguishers.
              </li>
              <li>
                The organizers reserve the right to disqualify any vehicle that
                does not meet the required safety standards.
              </li>
            </ul>

            <p className="text-lg font-medium">
              3. <span className="font-bold">Insurance and Liability</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Participants must have personal insurance coverage. The
                organizers are not responsible for any injury, damage, or loss
                that occurs during the event.
              </li>
              <li>
                By registering for the race, you agree to waive any claims
                against the organizers, sponsors, and event staff for accidents,
                injuries, or damages that may occur before, during, or after the
                event.
              </li>
            </ul>

            <p className="text-lg font-medium">
              4. <span className="font-bold">Code of Conduct</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Participants must adhere to all race rules and follow the
                directions of event officials, marshals, and safety personnel at
                all times.
              </li>
              <li>
                Any participant found to be driving recklessly, under the
                influence of alcohol or drugs, or violating any other rules will
                be disqualified and may face further legal action.
              </li>
              <li>
                Participants should show respect to fellow racers and
                spectators. Unsportsmanlike behavior will not be tolerated.
              </li>
            </ul>

            <p className="text-lg font-medium">
              5. <span className="font-bold">Health and Safety</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All participants must be in good physical health and free from
                any medical conditions that may impair their ability to race
                safely.
              </li>
              <li>
                You agree to undergo a medical evaluation if required by the
                event organizers and to provide proof of good health.
              </li>
            </ul>

            <p className="text-lg font-medium">
              6. <span className="font-bold">Media and Promotion</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                By registering for the event, participants grant permission to
                the event organizers and sponsors to use their name, image, and
                racing performance for promotional and marketing purposes.
              </li>
              <li>
                Photographs, video recordings, and other media taken during the
                event may be used for marketing, media, and promotional
                purposes.
              </li>
            </ul>

            <p className="text-lg font-medium">
              7.{" "}
              <span className="font-bold">
                Event Cancellation or Rescheduling
              </span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The organizers reserve the right to cancel or reschedule the
                event due to unforeseen circumstances, including weather
                conditions or emergencies.
              </li>
              <li>
                In case of cancellation or rescheduling, participants will be
                notified, and a refund or alternative date will be provided as
                per the event policy.
              </li>
            </ul>

            <p className="text-lg font-medium">
              8. <span className="font-bold">Refunds</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Refunds will only be issued in the event of cancellation by the
                organizers or in extreme situations, as deemed appropriate by
                the event management.
              </li>
              <li>
                No refunds will be provided for participants who voluntarily
                withdraw from the event once registration is complete.
              </li>
            </ul>

            <p className="text-lg font-medium">
              9. <span className="font-bold">Code of Practice</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                All participants must behave in accordance with the race code of
                practice and ensure the highest level of safety and fairness is
                maintained throughout the event.
              </li>
            </ul>

            <p className="text-lg font-medium">
              10. <span className="font-bold">Agreement</span>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                By signing up for the event, participants confirm they have
                read, understood, and agree to these terms and conditions.
              </li>
              <li>
                Participants agree to follow all event instructions, rules, and
                regulations and accept full responsibility for their actions
                during the event.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
