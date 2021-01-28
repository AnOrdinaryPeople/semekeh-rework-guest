if (process.env.NODE_ENV === 'production') {
    let timer: any, timerr: any

    require('devtools-detect')

    window.addEventListener('devtoolschange', (e: any) => {
        if (e.detail.isOpen) {
            console.log('%cHOOOOOOOLD UP!', 'font-size:6rem;font-weight:bold;color:#e3342f')
            console.log('%cWhat are you %cbuying%c doing?', 'font-size: 2rem', 'font-size: 2rem;text-decoration:line-through', 'font-size: 2rem;text-decoration:none')
            console.log('%cNothing interesting here.. Just close this and pretend to see nothing :)', 'font-size: 2rem')
            timer = setTimeout(() => {
                console.log('%cStill not close this thing? well just wait for a second there something interesting will appear', 'font-size: 2rem')
                timerr = setTimeout(() => {
                    console.log(`       ,
       \\\`-._           __
        \\\\  \`-..____,.'  \`.
         :\`.         /    \\\`.
         :  )       :      : \\
          ;'        '   ;  |  :
          )..      .. .:.\`.;  :
         /::...  .:::...   \` ;
         ; _ '    __        /:\\
         \`:o>   /\\o_>      ;:. \`.
        \`-\`.__ ;   __..--- /:.   \\
        === \\_/   ;=====_.':.     ;
         ,/'\`--'...\`--....        ;
              ;                    ;
            .'                      ;
          .'                        ;
        .'     ..     ,      .       ;
       :       ::..  /      ;::.     |
      /      \`.;::.  |       ;:..    ;
     :         |:.   :       ;:.    ;
     :         ::     ;:..   |.    ;
      :       :;      :::....|     |
      /\\     ,/ \\      ;:::::;     ;
    .:. \\:..|    :     ; '.--|     ;
   ::.  :''  \`-.,,;     ;'   ;     ;
.-'. _.'\\      / \`;      \\,__:      \\
\`---'    \`----'   ;      /    \\,.,,,/
                   \`----\``)
                }, 10000)
            }, 10000)
        }

        if (!e.detail.orientation) {
            clearTimeout(timer)
            clearTimeout(timerr)
        }
    })
}