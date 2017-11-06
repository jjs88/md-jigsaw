(function(global) {


    var pieces = [
        {id: 'piece-45', imgSrc: 'img/Group 45.png'},
        {id: 'piece-44', imgSrc: 'img/Group 44.png'},
        {id: 'piece-27', imgSrc: 'img/Group 27.png'},
        {id: 'piece-26', imgSrc: 'img/Group 26.png'},
        {id: 'piece-23', imgSrc: 'img/Group 23.png'},
        {id: 'piece-43', imgSrc: 'img/Group 43.png'},
        {id: 'piece-42', imgSrc: 'img/Group 42.png'},
        {id: 'piece-25', imgSrc: 'img/Group 25.png'},
        {id: 'piece-24', imgSrc: 'img/Group 24.png'},
        {id: 'piece-41', imgSrc: 'img/Group 41.png'},
        {id: 'piece-40', imgSrc: 'img/Group 40.png'},
        {id: 'piece-18', imgSrc: 'img/Group 18.png'},
        {id: 'piece-17', imgSrc: 'img/Group 17.png'},
        {id: 'piece-22', imgSrc: 'img/Group 22.png'},
        {id: 'piece-39', imgSrc: 'img/Group 39.png'},
        {id: 'piece-38', imgSrc: 'img/Group 38.png'},
        {id: 'piece-16', imgSrc: 'img/Group 16.png'},
        {id: 'piece-15', imgSrc: 'img/Group 15.png'},
        {id: 'piece-37', imgSrc: 'img/Group 37.png'},
        {id: 'piece-36', imgSrc: 'img/Group 36.png'},
        {id: 'piece-14', imgSrc: 'img/Group 14.png'},
        {id: 'piece-13', imgSrc: 'img/Group 13.png'},
        {id: 'piece-21', imgSrc: 'img/Group 21.png'},
        {id: 'piece-35', imgSrc: 'img/Group 35.png'},
        {id: 'piece-34', imgSrc: 'img/Group 34.png'},
        {id: 'piece-12', imgSrc: 'img/Group 12.png'},
        {id: 'piece-11', imgSrc: 'img/Group 11.png'},
        {id: 'piece-33', imgSrc: 'img/Group 33.png'},
        {id: 'piece-32', imgSrc: 'img/Group 32.png'},
        {id: 'piece-10', imgSrc: 'img/Group 10.png'},
        {id: 'piece-9', imgSrc: 'img/Group 9.png'},
        {id: 'piece-20', imgSrc: 'img/Group 20.png'},
        {id: 'piece-31', imgSrc: 'img/Group 31.png'},
        {id: 'piece-30', imgSrc: 'img/Group 30.png'},
        {id: 'piece-8', imgSrc: 'img/Group 8.png'},
        {id: 'piece-7', imgSrc: 'img/Group 7.png'},
        {id: 'piece-29', imgSrc: 'img/Group 29.png'},
        {id: 'piece-28', imgSrc: 'img/Group 28.png'},
        {id: 'piece-6', imgSrc: 'img/Group 6.png'},
        {id: 'piece-5', imgSrc: 'img/Group 5.png'},
        {id: 'piece-19', imgSrc: 'img/Group 19.png'},]


    var game = {

        init: function() {
            this.cacheDOM();
            this.events();
        },
        cacheDOM: function(){

            this.controlsCntr = document.getElementsByClassName('controls-cntr')[0];
            this.gameStartCntr = document.getElementsByClassName('game-start-cntr')[0];
            this.tray = document.getElementsByClassName('tray')[0];
            this.btnNormal = document.getElementsByClassName('btn-normal')[0];
            this.btnHard = document.getElementsByClassName('btn-hard')[0];
            this.btnHint = document.getElementsByClassName('btn-hint')[0];
            this.btnOver = document.getElementsByClassName('btn-over')[0];
            this.dashboard = document.getElementsByClassName('dashboard')[0];
            this.minutes = document.getElementsByClassName('minutes')[0];
            this.seconds = document.getElementsByClassName('seconds')[0];
            this.puzzleSlot = document.getElementsByClassName('puzzle-slot');
            this.solvedPic = document.getElementsByClassName('solved-pic')[0];
            this.gameOverModal = document.getElementsByClassName('modal')[0];
            this.hintCntHTML = document.getElementsByClassName('hint-cnt')[0];
            this.hintCount;
            this.timerTracker;
            this.countdownMinutes;
            this.countdownSeconds;
        },
        events: function() {

            this.dashboard.addEventListener('click', function(e) {

                if(e.target.classList.contains('btn-normal')) {
                    
                    game.startGame('normal');
                    
                }
                              
                if(e.target.classList.contains('btn-hard')) {
                    
                    game.startGame('hard');
        
                }

                if(e.target.classList.contains('btn-stop')) {

                    game.stopGame();
                }

            });

            this.btnOver.addEventListener('click', function(e) {

                game.toggleHidden(game.gameOverModal);
            })

            this.btnHint.addEventListener('mousedown', function(e) {

                if(game.hintCount > 0) {
                    game.toggleHidden(game.solvedPic);
                }
        
            });

            this.btnHint.addEventListener('mouseup', function(e) {

                game.hintCount-=1; 

                if(game.hintCount >= 0) {
                    game.toggleHidden(game.solvedPic);
                    game.changeHintCountHTML();
                }           
            })

            game.addPuzzleSlotEvents();           
        },
        addPuzzleSlotEvents:function() {

            // drop location events
            for(var i=0; i < game.puzzleSlot.length; i++) {

                game.puzzleSlot[i].addEventListener('dragenter', game.handleDragEnter);
                game.puzzleSlot[i].addEventListener('dragleave', game.handleDragLeave);
                game.puzzleSlot[i].addEventListener('drop', game.handleDrop);
                game.puzzleSlot[i].addEventListener('dragover', game.handleDragOver);
            }
        },
        addShakeClass:function() {
            
            var pieces = document.querySelectorAll("[id^='piece']");

            for(var i=0; i < pieces.length; i++ ) {
                pieces[i].classList.add('shake-piece');
            }

        },
        isPuzzleComplete: function() {

            var trayCount = game.tray.querySelectorAll("[id^='piece']").length;
            // check whether the tray is empty. If so, game has been completed.
            if(trayCount == 0) {
                return true;
            }
        },
        clearTray: function() {

            while(game.tray.firstChild) {
                game.tray.removeChild(game.tray.firstChild);
            }
        },
        clearTimerHTML:function() {

            game.minutes.innerHTML = "";
            game.seconds.innerHTML = "";
        },
        clearPuzzle:function() {
            for(var i=0; i < game.puzzleSlot.length; i++) {
                if(game.puzzleSlot[i].firstChild) {
                    game.puzzleSlot[i].removeChild(game.puzzleSlot[i].firstChild);
                }
            }
        },
        changeHintCountHTML:function() {

            game.hintCntHTML.innerHTML = game.hintCount;

        },
        delayEnding:function() {

            setTimeout(function() {

                game.stopGame();

            },4000);

        },
        getStartingTime:function(mode) {

            if(mode == 'normal') {
                var startTime = new Date().getMinutes();
                var newMins = new Date().setMinutes(startTime + 10);
                var endTime = new Date(newMins);
                return endTime;
            }

            if(mode == 'hard') {
                var startTime = new Date().getMinutes();
                var newMins = new Date().setMinutes(startTime + 5);
                var endTime = new Date(newMins);
                return endTime;
            }
        },
        gameTimeRemaining:function(){
            // uses value from getStartingTime function
            var total = Date.parse(game.countdownTime) - Date.parse(new Date());
            var seconds = Math.floor( (total/1000) % 60 );
            var minutes = Math.floor( (total/1000/60) % 60 );
            
            return {
              'total': total,
              'minutes': minutes,
              'seconds':seconds
            };
          },
        handleDragStart:function(e) {
            // console.log('drag start')
            // capture the ID of the puzzle piece
            e.dataTransfer.setData ("text/plain", e.target.id);
        },
        handleDragEnd:function(e) {
            
            // console.log('drag end');
    
            // add code here to handle any changes to the draggable object after being dropped        
        },
        handleDragEnter:function(e) {
            
            e.target.style.border = '2px dashed #D2525F';
        },
        handleDragLeave:function(e) {
            e.target.style.border = '';
        },
        handleDragOver:function(e) {
            e.preventDefault();
        },
        handleDrop:function(e) {
            
            e.preventDefault();
    
            var piece = e.target.getAttribute('data-piece');
    
            var data = e.dataTransfer.getData('Text');
    
            if(piece == data) {
                // console.log('correct data piece');
                e.target.appendChild(document.getElementById(data));
            }

            if(game.isPuzzleComplete()) {
                game.addShakeClass();
                game.stopTimer();
                game.delayEnding();
            }    
            // get rid of dashed border around the drop zone
             e.target.style.border = '';
        },    
        startGame: function(mode) {

            game.loadTray(
                game.shufflePieces(
                    game.createPieces(pieces
                    )
                )
            )
            game.countdownTime = game.getStartingTime(mode);
            game.startTimer();
            game.toggleHidden(game.controlsCntr);
            game.toggleHidden(game.gameStartCntr);
            game.toggleHidden(game.tray);
            game.setHintCount();
        },
        toggleHidden:function(element) {

            if(element.classList.contains('toggle-hidden')) {
                element.classList.remove('toggle-hidden');
            } else {
                element.classList.add('toggle-hidden');
            }
        },
        loadTray:function(pieces) {

            for(var i=0; i < pieces.length; i++) {
              game.tray.appendChild(pieces[i]);
            }
        },
        createPieces:function(pieces) {

            var allPieces = [];

            for(var i=0; i < pieces.length; i++) {

                var newImg = document.createElement('img');

                newImg.setAttribute('draggable', true);
                newImg.id = pieces[i].id;
                newImg.src = pieces[i].imgSrc;

                // add drag events
                newImg.addEventListener('dragstart', game.handleDragStart);
                newImg.addEventListener('dragend', game.handleDragEnd);

                    
                allPieces.push(newImg);
            }
            return allPieces;
        },
        setHintCount:function() {

            game.hintCount = 3;
        },
        shufflePieces: function(array) {
      
            var i = 0
            , j = 0
            , temp = null
        
            for (i = array.length - 1; i > 0; i -= 1) {
                j = Math.floor(Math.random() * (i + 1))
                temp = array[i]
                array[i] = array[j]
                array[j] = temp
            }
            return array;
        },
        startTimer: function() {
     
            game.timerTracker = setInterval(function() {

                var time = game.gameTimeRemaining();

                game.minutes.innerHTML = time.minutes + ":";
                // tack "0" to seconds and grab the last 2 digits, workaround for seconds under 10
                game.seconds.innerHTML = ("0" + time.seconds).slice(-2); 
                
                if(time.total == 0) {
                    game.stopTimer()
                    game.stopGame();
                    game.toggleHidden(game.gameOverModal);
                }
            }, 1000);
        },
        stopGame:function() {

            clearInterval(game.timerTracker);
            game.toggleHidden(game.controlsCntr);
            game.toggleHidden(game.gameStartCntr);
            game.toggleHidden(game.tray);
            game.clearTimerHTML();
            game.clearTray();
            game.clearPuzzle();
            game.setHintCount();
            game.changeHintCountHTML();    
        },
        stopTimer:function() {
            clearInterval(game.timerTracker);
        }
    }

    game.init();

})(window);