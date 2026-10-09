
const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

// Supabase library load 
const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const mobile = document.getElementById("visitorPhone").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();

  if (!name || !mobile || !email) {
    formMessage.textContent = "Please fill in all details.";
    return;
  }

  const submitButton = contactForm.querySelector(
    'button[type="submit"]'
  );

  submitButton.disabled = true;
  formMessage.textContent = "Submitting...";

  try {
    const { error } = await supabaseClient
      .from("Contacts")
      .insert([{ name, mobile, email }]);

    if (error) {
      console.error("Supabase error:", error.message);
      formMessage.textContent =
        "Could not save details. Please try again.";
      return;
    }

    formMessage.textContent = "Details submitted successfully!";
    contactForm.reset();
  } catch (error) {
    console.error(error);
    formMessage.textContent = "Something went wrong.";
  } finally {
    submitButton.disabled = false;
  }
});