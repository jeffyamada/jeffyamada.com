import { Text as TroikaText } from 'troika-three-text';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      troikaText: MeshStandardNodeMaterial<TroikaText, typeof TroikaText>;
    }
  }
}
