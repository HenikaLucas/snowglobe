/* 
    Use to wrap div or any HTML element which does not belong to a parent container
    React needs a container to pass the HTML

    Example:
        <div>
            <h1>Hello</h1>
            <p>How are you?</p>
        </div>
    
    If you don't want the div wrapper

        <Aux>
            <h1>Hello</h1>
            <p>How are you?</p>
        </Aux>
    
    This acts as a virtual wrapper
*/

const aux = (props) => props.children;

export default aux;