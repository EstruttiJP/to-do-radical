import { StyleSheet, Text } from 'react-native';

interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'left',
    marginBottom: 24,
  },
});