# Contributing to Campus Sahayak

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the bug is already reported
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Features

1. Check existing feature requests
2. Create an issue describing:
   - The feature
   - Use case
   - Why it's valuable for students

### Code Contributions

#### Setup Development Environment
```bash
git clone https://github.com/yourusername/campus-sahayak.git
cd campus-sahayak
npm install
npm start
```

#### Coding Guidelines

1. **Code Style**
   - Use ES6+ features
   - Follow Airbnb JavaScript style guide
   - Use meaningful variable names
   - Add comments for complex logic

2. **Component Structure**
```javascript
   // imports
   import React, { useState } from 'react';
   
   // component
   const MyComponent = () => {
     // hooks
     const [state, setState] = useState();
     
     // functions
     const handleClick = () => {};
     
     // render
     return <div>...</div>;
   };
   
   export default MyComponent;
```

3. **File Naming**
   - Components: PascalCase (e.g., `ChatAssistant.jsx`)
   - Utilities: camelCase (e.g., `helpers.js`)
   - Constants: UPPER_SNAKE_CASE

4. **Git Commit Messages**
   - Use present tense: "Add feature" not "Added feature"
   - Be descriptive but concise
   - Reference issues: "Fix #123: Resolve chat bug"

#### Pull Request Process

1. Fork the repository
2. Create a new branch:
```bash
   git checkout -b feature/amazing-feature
```

3. Make your changes

4. Test thoroughly:
```bash
   npm test
   npm run build
```

5. Commit changes:
```bash
   git commit -m "Add amazing feature"
```

6. Push to your fork:
```bash
   git push origin feature/amazing-feature
```

7. Open a Pull Request with:
   - Clear description
   - Screenshots/GIFs if UI changes
   - Reference related issues

### Code Review

- Be respectful and constructive
- Explain your suggestions
- Be open to feedback

## Project Structure
src/
├── components/     # React components
├── services/       # API services
├── hooks/          # Custom hooks
├── utils/          # Utility functions
├── context/        # React context
└── styles/         # CSS files

## Areas for Contribution

### High Priority
- [ ] Multi-language support (Hindi, Tamil, etc.)
- [ ] Offline mode
- [ ] Mobile app version
- [ ] Advanced study analytics

### Medium Priority
- [ ] Dark mode
- [ ] Export study plans as PDF
- [ ] Integration with Google Calendar
- [ ] Mock interview simulator

### Low Priority
- [ ] Social features (study groups)
- [ ] Gamification
- [ ] Browser extension
- [ ] Desktop app

## Community

- Be respectful and inclusive
- Help fellow contributors
- Share your knowledge
- Celebrate successes

## Recognition

Contributors will be recognized in:
- README.md
- Project documentation
- Release notes

## Questions?

Feel free to ask in:
- GitHub Discussions
- Issue comments
- Email: contribute@campussahayak.com

---

**Thank you for making Campus Sahayak better! 🙏**