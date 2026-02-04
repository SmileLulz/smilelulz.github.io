document.addEventListener('DOMContentLoaded', function() {
    const donateBtn = document.getElementById('donate-btn');
    const overlay = document.getElementById('overlay');
    const closePopup = document.getElementById('close-popup');

    if (donateBtn && overlay && closePopup) {
        donateBtn.addEventListener('click', () => {
            overlay.style.display = 'flex';
        });

        closePopup.addEventListener('click', () => {
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    const terminalInput = document.getElementById('terminal-input');
    const currentCommand = document.getElementById('current-command');
    const cursor = document.getElementById('cursor');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalPrompt = document.querySelector('.terminal-prompt');
    
    if (terminalInput && currentCommand && cursor && terminalOutput && terminalPrompt) {
        let commandHistory = [];
        let historyIndex = -1;
        let currentInput = '';

        const commands = {
            'help': () => `Available commands: ${window.location.pathname === '/' ? 'about, ' : 'home, '}games, socials, refresh, back, clear, help, donate, email, smashbit, shape-buster, google-play, itch, discord, twitter, instagram, odysee, youtube, buymeacoffee, kofi`,
            'about': () => {
                if (window.location.pathname !== '/about') {
                    window.location.href = '/about';
                    return 'Redirecting to About page...';
                }
                return 'You are already on the About page!';
            },
            'home': () => {
                if (window.location.pathname !== '/') {
                    window.location.href = '/';
                    return 'Redirecting to Home page...';
                }
                return 'You are already on the Home page!';
            },
            'games': () => {
                if (window.location.pathname === '/') {
                    document.getElementById('games').scrollIntoView({ behavior: 'smooth' });
                    return 'Scrolling to games section...';
                } else {
                    window.location.href = '/#games';
                    return 'Redirecting to games section...';
                }
            },
            'socials': () => {
                if (window.location.pathname !== '/socials') {
                    window.location.href = '/socials';
                    return 'Redirecting to Socials page...';
                }
                return 'You are already on the Socials page!';
            },
            'refresh': () => {
                window.location.reload();
                return 'Refreshing page...';
            },
            'smashbit': () => {
                if (window.location.pathname !== '/games/smashbit/') {
                    window.location.href = '/games/smashbit/';
                    return 'Redirecting to Smashbit page...';
                }
                return 'You are already on the Smashbit page!';
            },
            'shape-buster': () => {
                if (window.location.pathname !== '/games/shape-buster/') {
                    window.location.href = '/games/shape-buster/';
                    return 'Redirecting to SHAPE-buster page...';
                }
                return 'You are already on the SHAPE-buster page!';
            },
            'email': () => {
                window.location.href = 'mailto:SmileLulzContact@gmail.com';
                return 'Opening email client...';
            },

            // Socials
            'google-play': () => {
                window.open('https://play.google.com/store/apps/developer?id=SmileLulz', '_blank');
                return 'Opening Google Play Store...';
            },
            'itch': () => {
                window.open('https://itch.io/profile/smilelulz', '_blank');
                return 'Opening itch.io profile...';
            },
            'discord': () => {
                window.open('https://discord.gg/VmE8cEzXR5', '_blank');
                return 'Opening Discord server...';
            },
            'twitter': () => {
                window.open('https://x.com/SmileLulz', '_blank');
                return 'Opening Twitter/X...';
            },
            'instagram': () => {
                window.open('https://www.instagram.com/smilelulz', '_blank');
                return 'Opening Instagram...';
            },
            'odysee': () => {
                window.open('https://odysee.com/@SmileLulz', '_blank');
                return 'Opening Odysee...';
            },
            'youtube': () => {
                window.open('https://www.youtube.com/@SmileLulz', '_blank');
                return 'Opening YouTube...';
            },
            'buymeacoffee': () => {
                window.open('https://buymeacoffee.com/smilelulz', '_blank');
                return 'Opening Buy Me a Coffee...';
            },
            'kofi': () => {
                window.open('https://ko-fi.com/smilelulz', '_blank');
                return 'Opening Ko-fi...';
            },
            'back': () => {
                window.history.back();
                return 'Going back...';
            },
            'clear': () => {
                terminalOutput.innerHTML = '';
                return '';
            },
            'donate': () => {
                document.getElementById('overlay').style.display = 'flex';
                return 'Opening donation popup...';
            }
        };

        terminalPrompt.addEventListener('click', (e) => {
            e.stopPropagation();
            terminalInput.focus();
        });

        terminalInput.addEventListener('focus', () => {
            cursor.style.animation = 'blink 1s infinite';
        });

        terminalInput.addEventListener('blur', () => {
            cursor.style.animation = 'none';
            cursor.style.opacity = '1';
        });

        terminalInput.addEventListener('keydown', (e) => {
            e.stopPropagation();
            
            switch(e.key) {
                case 'Enter':
                    executeCommand(currentInput.trim());
                    break;
                case 'Backspace':
                    currentInput = currentInput.slice(0, -1);
                    updateDisplay();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    navigateHistory(-1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    navigateHistory(1);
                    break;
                case 'Tab':
                    e.preventDefault();
                    autoComplete();
                    break;
                default:
                    if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                        currentInput += e.key;
                        updateDisplay();
                    }
            }
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.altKey || e.metaKey) {
                if (['r', 't', 'w', 'n', 'l', 'a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
                    e.stopPropagation();
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!terminalPrompt.contains(e.target)) {
                terminalInput.blur();
            }
        });

        function updateDisplay() {
            currentCommand.textContent = currentInput;
        }

        function executeCommand(cmd) {
            if (cmd === '') return;
            
            commandHistory.push(cmd);
            historyIndex = commandHistory.length;
            
            addOutput(`$ ${cmd}`, 'command-output');
            
            if (commands[cmd]) {
                const result = commands[cmd]();
                if (result) {
                    addOutput(result, 'command-output');
                }
            } else {
                addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error-output');
            }
            
            currentInput = '';
            updateDisplay();
        }

        function addOutput(text, className = '') {
            const outputLine = document.createElement('div');
            outputLine.className = `output-line ${className}`;
            outputLine.textContent = text;
            terminalOutput.appendChild(outputLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        function navigateHistory(direction) {
            if (commandHistory.length === 0) return;
            
            historyIndex = Math.max(0, Math.min(commandHistory.length, historyIndex + direction));
            
            if (historyIndex === commandHistory.length) {
                currentInput = '';
            } else {
                currentInput = commandHistory[historyIndex];
            }
            updateDisplay();
        }

        function autoComplete() {
            const matches = Object.keys(commands).filter(cmd => 
                cmd.startsWith(currentInput.toLowerCase())
            );
            
            if (matches.length === 1) {
                currentInput = matches[0];
                updateDisplay();
            } else if (matches.length > 1) {
                addOutput(`Possible completions: ${matches.join(', ')}`, 'command-output');
            }
        }

        addOutput('Type "help" for available commands', 'command-output');
        
        terminalInput.focus();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});