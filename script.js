const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Fonction pour afficher le texte lettre par lettre
function typeWriterEffect(text, speed = 60) {
  quoteText.innerHTML = ""; // Vide le contenu pour commencer
  let i = 0;

  function typeLetter() {
    if (i < text.length) {
      quoteText.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeLetter, speed); // Appelle récursivement jusqu'à ce que le texte soit complet
    }
  }

  typeLetter(); // Lance la fonction de "typing"
}

// Get Quotes From API (chargement initial)
async function getQuotes() {
  showLoadingSpinner(); // Affiche le spinner pendant le chargement initial
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    removeLoadingSpinner(); // Masque le loader après le chargement
    newQuotes(); // Affiche la première citation
  } catch (error) {
    console.error("Erreur lors de la récupération des citations:", error);
    removeLoadingSpinner(); // Masque le loader en cas d'erreur
  }
}

// Show New Quote
function newQuotes() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Vérifie si l'auteur est présent
  authorText.innerHTML = quote.author || "Unknown";

  // Ajuste le style de la citation si elle est longue
  if (quote.text.length > 70) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  // Affiche la citation avec l'effet de typewriter
  typeWriterEffect(quote.text);
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuotes);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
