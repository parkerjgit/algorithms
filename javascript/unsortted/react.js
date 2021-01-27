// simple component
class App extends React.Component {
    constructor(props) {
        // do this if you require "this" inside constructor?
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <A name='Jack'/>
                <A name='Case'/>
            </React.Fragment>
        )
    }
}

const A = ({name}) => {
    <div>name: {name}</div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)