# React Smooth Render



Mount & unmount react components visually smooth using **React Fragments** without leaving any footprints.

Demo: [https://ferrousdesigner.github.io/react-smooth-render/](https://ferrousdesigner.github.io/react-smooth-render/)

## Props

|      Props          |Type                       | Default Value               |Description
|----------------|-------------------------------|-----------------------------|-------
|hidden|Boolean(Required)|false| Describes the visibility of the component
|initiallyHidden |Boolean|false| Describes the initial visibility of the component   
|timing          |Number |250| Animation duration in milliseconds
|children|Node(Required)| undefined

## Installation
~~~
npm install --save react-smooth-render
~~~

## Usage
~~~
import  SmoothRender  from  'react-smooth-render';

class App extends Component {
  state =  {
    hidden: false // State varible which is used to toggle the visibility on SmoothRender
  }
	render() {
		const { hidden } = this.state
		return (
			<div>
				{/* This button toggles the state */}
		        <button 
			        onClick={() => this.setState({ hidden: !hidden })}>
			        Toggle
			     </button>
				<SmoothRender hidden={hidden} timing={350}>
			        <h1>This will mount and unmount smoothly.</h1>
				</SmoothRender>
			</div>
		);
	}
}

export default App;
~~~

