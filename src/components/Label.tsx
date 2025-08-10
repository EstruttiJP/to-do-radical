import { StyleSheet, Text } from 'react-native';

interface LabelProps {
  text: string;
  completed?: boolean;
}

export default function Label({ text, completed }: LabelProps) {
  return (
    <Text style={[styles.label, completed && styles.labelCompleted]}>
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 12,
  },
  labelCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});