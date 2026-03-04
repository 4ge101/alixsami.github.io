import { ThreeElements } from '@react-three/fiber'

declare global {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            [elemName: string]: any;
        }
    }
}

// Support for React 18/19 JSX namespace
declare namespace React {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            [elemName: string]: any;
        }
    }
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            [elemName: string]: any;
        }
    }
}
