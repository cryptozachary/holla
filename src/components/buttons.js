export default function Buttons(props) {

    return (
        <button type="button" onClick={props.handleClick} className="button" > {props.padNote}</button >

    )
}