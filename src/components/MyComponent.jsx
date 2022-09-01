function MyComponent(props) {
    return (
        <>
            {props.children && (
                <div dangerouslySetInnerHTML={{__html: `${props.children}`}}></div>
            )}
        </>
    )
}

export default MyComponent;
