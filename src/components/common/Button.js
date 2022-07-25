import './Button.css';

export function Button({classes, onClick, text}) {

  const className = `button ${classes}`;

  return <button className={className} onClick={() => onClick()} >{text}</button>
}