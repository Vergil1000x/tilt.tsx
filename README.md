# React Tilt Component

A customizable React component that creates a 3D tilt effect on mouse movement, enhancing user interaction on your web applications. This component is perfect for adding depth and engaging visuals to any element.

## Features

- **3D Tilt Effect**: Elements tilt based on mouse position.
- **Customizable Parameters**: Easily adjust tilt angles, perspective, scale, transition speed, and easing functions.
- **Selective Pop-Outs**: Define elements that pop out in 3D when hovered over.
- **Axis Control**: Disable tilting along the X or Y axis.
- **Lightweight**: Minimal overhead for a rich user experience.

## Installation

You can install the component via npm or yarn:

```bash
npm install your-package-name
```

or

```bash
yarn add your-package-name
```

## Usage

Here's a basic example of how to use the Tilt component:

```jsx
import React from "react";
import Tilt from "your-package-name";

const App = () => {
  return (
    <Tilt
      maxTilt={30}
      perspective={1000}
      scale={1.1}
      speed={500}
      easing="cubic-bezier(.03,.98,.52,.99)"
      className="tilt-effect"
      popOutSelector=".pop-out"
    >
      <div className="pop-out-[20px]">Hover over me!</div>
      <div>I'm just a regular child.</div>
    </Tilt>
  );
};

export default App;
```

## Props

| Prop             | Type              | Default                         | Description                                         |
| ---------------- | ----------------- | ------------------------------- | --------------------------------------------------- | ----------------------------------- |
| `maxTilt`        | `number`          | `20`                            | Maximum tilt angle in degrees.                      |
| `perspective`    | `number`          | `1000`                          | Perspective distance in pixels.                     |
| `easing`         | `string`          | `cubic-bezier(.03,.98,.52,.99)` | Easing function for transitions.                    |
| `scale`          | `number`          | `1`                             | Scale factor for the element.                       |
| `speed`          | `number`          | `1000`                          | Transition speed in milliseconds.                   |
| `disableAxis`    | `"x"              | "y"                             | null`                                               | Disable tilting on the X or Y axis. |
| `className`      | `string`          | -                               | Custom CSS class for the tilt component.            |
| `children`       | `React.ReactNode` | -                               | Child elements to be rendered inside the component. |
| `popOutSelector` | `string`          | `".pop-out"`                    | Selector for child elements that should pop out.    |

## Events

The component responds to the following mouse events:

- `mousemove`: Triggers tilt effect based on mouse position.
- `mouseenter`: Starts the tilt effect on mouse enter.
- `mouseleave`: Resets the tilt effect on mouse leave.

## Example with Pop-Out Elements

To create pop-out effects, you can use class names that follow the pattern `pop-out-[Xpx]` for elements you want to pop out:

```jsx
<div className="pop-out-[30px]">I'm popping out!</div>
```

## Custom Styling

You can add your custom styles for the tilt effect and pop-out elements as needed.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Feel free to submit issues or pull requests to improve this component!

## Contact

For questions or suggestions, please open an issue in the GitHub repository or reach out via email.
