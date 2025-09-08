// Flashcards data array
let flashcards = [];

// Fetching flashcards from OpenTDB API
async function fetchFlashcards() {
    try {
        let response = await fetch("https://opentdb.com/api.php?amount=5&type=boolean"); 
        let data = await response.json();
        console.log(data);  // check in console

        // Map API data to flashcards format
        flashcards = data.results.map(item => ({
            front: item.question,
            back: item.correct_answer
        }));

        renderCards();
    } catch (error) {
        console.error("API error:", error);
    }
}

// Render the flashcards dynamically
function renderCards() {
    const flashcardContainer = document.getElementById('flashcard-container');
    flashcardContainer.innerHTML = '';  // Clear existing cards
    flashcards.forEach((card, index) => {
        const flashcardDiv = document.createElement('div');
        flashcardDiv.classList.add('flashcard');
        flashcardDiv.innerHTML = `
            <div class="card-content" onclick="flipCard(${index})">
                <p>${card.front}</p>
            </div>
        `;
        flashcardContainer.appendChild(flashcardDiv);
    });
}

// Flip the flashcard
function flipCard(index) {
    const card = flashcards[index];
    const cardContent = document.querySelectorAll('.flashcard')[index].querySelector('.card-content');
    
    if (cardContent.innerHTML.includes(card.front)) {
        cardContent.innerHTML = `<p>${card.back}</p>`;
    } else {
        cardContent.innerHTML = `<p>${card.front}</p>`;
    }
}

// Function to add a new card manually
function addCard() {
    const newFront = prompt("Enter the question:");
    const newBack = prompt("Enter the answer:");
    if (newFront && newBack) {
        flashcards.push({ front: newFront, back: newBack });
        renderCards();
    }
}

// Function to remove the last card
function removeCard() {
    flashcards.pop();
    renderCards();
}

// Call API when page loads
fetchFlashcards();
