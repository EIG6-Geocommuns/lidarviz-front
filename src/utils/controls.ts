import * as THREE from 'three';

// This table associates the key KEY to its corresponding integer keyCode
// (e.g. LEFT is associated to keyCode 37)
// If some key is missing, see https://keyjs.dev/ for its corresponding keyCode
const KEYS = {
    SHIFT: 16,
    CTRL: 17,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40,
};

// Those are the default itowns options
// An event can only be associated to a single combination of mouse + key
// inputs...
export const defaultOptions = {
    // ORBIT: the camera rotates around its target (the center of the view?) at
    // a constant distance from it.
    ORBIT: { // here ORBIT is triggered on mouse left click + CTRL key
        enable: true,   // indicates whether this event is enabled
        mouseButton: THREE.MOUSE.LEFT, // either LEFT, RIGHT or MIDDLE
        double: false, // indicates if the mouse button should be pressed twice
        keyboard: KEYS.CTRL, // the keyboard keycode associated to this event
        finger: 2, // number of fingers (trackpad) associated to this event, ignore it
    },
    // MOVE_GLOBE: camera drag movement, the camera is moved around the view to
    // give the feeling that the view is dragged under a static camera.
    MOVE_GLOBE: { // here MOVE_GLOBE is triggered on mouse left click only
        enable: true,
        mouseButton: THREE.MOUSE.LEFT,
        double: false,
        finger: 1,
    },
    // DOLLY: camera dolly movement, the camera moves forward or backward from
    // its target.
    DOLLY: { // here DOLLY is triggered on mouse middle click only
        enable: true,
        mouseButton: THREE.MOUSE.MIDDLE,
        double: false,
        finger: 2,
    },
    // PAN: camera pan movement, the camera moves parallel to the current view
    // plane
    PAN: { // here PAN is triggered on mouse right click only
        enable: true,
        mouseButton: THREE.MOUSE.RIGHT,
        double: false,
        finger: 3,
    },
    // PANORAMIC: camera panoramic movement, the camera is rotated around its
    // own position
    PANORAMIC: { // here PANORAMIC is triggered on mouse left click + SHIFT key
        enable: true,
        mouseButton: THREE.MOUSE.LEFT,
        double: false,
        keyboard: KEYS.SHIFT,
    },
    // TRAVEL_IN: camera travel in movement : the camera is zoomed in toward a
    // given position. The target position depends on the key/mouse binding of
    // this state. If bound to a mouse button, the target position is the mouse
    // position. Otherwise, it is the center of the screen.
    TRAVEL_IN: { // here TRAVEL_IN is triggered on ''double'' mouse left click
        enable: true,
        mouseButton: THREE.MOUSE.LEFT,
        double: true,
    },
    // TRAVEL_OUT: camera travel out movement : the
    // camera is zoomed out from a given position. The target position depends
    // on the key/mouse binding of this state. If bound to a mouse button, the
    // target position is the mouse position. Otherwise, it is the center of the
    // screen. It is disabled by default.
    TRAVEL_OUT: { // here TRAVEL_OUT is disabled
        enable: false,
        double: false,
    },
    ZOOM: { // here ZOOM is enabled, it seems it's always bound to scrolling
        enable: true,
    },
    PAN_UP: { // here PAN_UP is triggered on UP key
        enable: true,
        keyboard: KEYS.UP,
        double: false,
    },
    PAN_BOTTOM: { // here PAN_BOTTOM is triggered on BOTTOM key
        enable: true,
        keyboard: KEYS.BOTTOM,
        double: false,
    },
    PAN_LEFT: { // here PAN_LEFT is triggered on LEFT key
        enable: true,
        keyboard: KEYS.LEFT,
        double: false,
    },
    PAN_RIGHT: { // here PAN_RIGHT is triggered on RIGHT key
        enable: true,
        keyboard: KEYS.RIGHT,
        double: false,
    },
};

export const demoLidarOptions = {
    PAN: {  // Disable pan movement.
        enable: false,
    },
    MOVE_GLOBE: {  // Change the key bindings for globe rotation.
        enable: true,
        mouseButton: THREE.MOUSE.LEFT,
    },
    ORBIT: {  // Change the key bindings for orbit movement (rotation around the camera target).
        enable: true,
        mouseButton: THREE.MOUSE.MIDDLE,
    },
    DOLLY: {  // Change the key bindings for dolly movement.
        enable: true,
        mouseButton: THREE.MOUSE.RIGHT,
    },
    PANORAMIC: {  // Change the key bindings for panoramic movement (rotation around the camera position).
        enable: true,
        mouseButton: THREE.MOUSE.LEFT,
        keyboard: KEYS.CTRL,  // keyCode for the ctrl key.
    },
    TRAVEL_OUT: {  // Allow travel out movement when double right-clicking.
        enable: true,
        mouseButton: THREE.MOUSE.RIGHT,
        double: true,
    },
};
