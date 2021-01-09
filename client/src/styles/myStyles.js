import { makeStyles } from '@material-ui/core'

const myStyles = makeStyles({
   defaultText: {
      cursor: 'default',
      WebkitTouchCallout: 'none' /* iOS Safari */,
      WebkitUserSelect: 'none' /* Safari */,
      KhtmlUserSelect: 'none' /* Konqueror HTML */,
      MozUserSelect: 'none' /* Old versions of Firefox */,
      MsUserSelect: 'none' /* Internet Explorer/Edge */,
      UserSelect:
         'none' /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
      fontFamily: "'Yeon Sung', cursive",
      textAlign: 'center',
   },
   dialogText: {
      cursor: 'default',
      WebkitTouchCallout: 'none' /* iOS Safari */,
      WebkitUserSelect: 'none' /* Safari */,
      KhtmlUserSelect: 'none' /* Konqueror HTML */,
      MozUserSelect: 'none' /* Old versions of Firefox */,
      MsUserSelect: 'none' /* Internet Explorer/Edge */,
      UserSelect:
         'none' /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */,
      fontFamily: "'Yeon Sung', cursive",
      textAlign: 'left',
   },
   mainBlock: {
      height: '300px',
   },
   size1: {
      fontSize: '1em',
   },
   size15: {
      fontSize: '1.5em',
   },
   size2: {
      fontSize: '2em',
   },
   size25: {
      fontSize: '2.5em',
   },
   size3: {
      fontSize: '3em',
   },
   size05: {
      fontSize: '0.5em',
   },
   prizeCard: {
      borderRadius: '50px',
      backgroundColor: 'skyblue',
   },
   dialogBG: {
      backgroundColor: 'skyblue',
   },
   gridCenter: {
      margin: '4px',
   },
   myTurn: {
      borderRadius: '50px',
      backgroundColor: 'pink',
      color: 'black',
   },
   oppTurn: {
      borderRadius: '50px',
      backgroundColor: 'lightgray',
      color: 'black',
   },
   tileContainer: {
      width: '90%',
      height: '90%',
      margin: 'auto',
   },
})

export default myStyles
