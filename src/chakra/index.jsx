import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const theme = extendTheme({
    breakpoints:{
        xs: "480px",
        sm: "600px",
        lg: "960px",
        xl: "1200px",
        "2xl": "1536px"
    },
    components: {
        Input : {
            baseStyle: {
                height: '50px',
                bg: 'white',
                _focus: {
                    borderWidth: '2px',
                    borderColor: 'greentext',
                },
                _active: {
                    borderWidth: '2px',
                    borderColor: 'greentext',
                }
            }
        },
        Button: {
            baseStyle:{
                _focus: {
                    opacity: '0.7',
                },
                _active: {
                    opacity: '0.8',
                }
            },
            variants:{
                'customOutlined': {
                    borderWidth: '2px',
                    borderColor: 'buttonbg',
                    color: 'white'
                },
                'customSolid': {
                    color: 'white',
                    bg: 'buttonbg',
                },
            }
        },
        InputLeftElement:{
            baseStyle:{
                color: 'greentext',
            }
        }
    },
    colors:{
        backdrop: 'rgba(0, 0, 0, 0.7)',
        textGreen: '#006838',
        greenBg: '#09aa5f',
        textYellow: '#FFF200',
        greenFade: '#99ecc5',
        yellowFade: '#f2ec80',
        darkbg: '#323232',
        greentext: '#128080',
        containerbg: '#a1e7c033',
        buttonbg: '#113f3f',
        transbg: 'rgba(0,0,0,0.6)',
        darkgray: '#121212',
        lightgr: '#4d4d4d',
    },
})