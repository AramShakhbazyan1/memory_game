# Memory Matching Game

A fun and interactive **Memory Matching Game** built with **React** and **Vite**. Players flip cards to find matching pairs within a time limit. The game features three difficulty levels, each with unique grid sizes and time constraints, ensuring an engaging and challenging experience.

---

## 🎮 Features

- **Three Difficulty Levels**:
  - **Easy**: 6 pairs, 1-minute time limit.
  - **Medium**: 10 pairs, 2-minute time limit.
  - **Hard**: 15 pairs, 3-minute time limit.
- **Timer Starts Dynamically**: The timer begins when the first card is flipped.
- **Matching Logic**:
  - Cards stay hidden until flipped.
  - Matched cards remain revealed.
  - Non-matching cards flip back automatically unless another card is clicked.
- **Game States**:
  - **Win**: Match all pairs before the timer runs out.
  - **Lose**: Timer runs out before all pairs are matched.
- **Restart Anytime**: A restart button resets the game state:
  - Shuffles cards.
  - Resets matched pairs, flipped cards, and the timer.
- **User Feedback**:
  - Congratulatory message on success.
  - Failure message on timer expiration.

---

## 🛠️ Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

Ensure the following tools are installed on your system:

- **Node.js** (v16 or later)
- **npm** or **yarn** package manager

---

### 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/memory_game.git
   cd memory_game
   npm install

2. **Run**:
  npm run dev
