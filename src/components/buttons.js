export default function Buttons(props) {

    return (
        <button onClick={props.handleClick} type="button" className="button" > {props.padName}</button >

    )
}