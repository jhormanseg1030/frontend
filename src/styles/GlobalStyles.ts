import { StyleSheet } from 'react-native';

// Colores principales de la aplicación
export const Colors = {
  primary: '#4A90E2',
  primaryDark: '#357ABD',
  secondary: '#50C878',
  accent: '#FF6B6B',
  background: '#F8F9FA',
  white: '#FFFFFF',
  black: '#1A1A1A',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};

// Tipografía
export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  fontWeight: {
    normal: '400' as '400',
    medium: '500' as '500',
    semibold: '600' as '600',
    bold: '700' as '700',
  },
};

// Espaciado
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

// Bordes y radios
export const Border = {
  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  width: {
    thin: 1,
    medium: 2,
    thick: 4,
  },
};

// Sombras
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Estilos globales reutilizables
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  
  // Botones
  buttonPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  buttonSecondary: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    ...Shadows.small,
  },
  buttonDanger: {
    backgroundColor: Colors.error,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  
  // Texto de botones
  buttonTextPrimary: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  buttonTextSecondary: {
    color: Colors.primary,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  buttonTextDanger: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  // Cards
  card: {
    backgroundColor: Colors.white,
    borderRadius: Border.radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  
  // Inputs
  input: {
    backgroundColor: Colors.white,
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    borderRadius: Border.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.black,
  },
  inputFocused: {
    borderColor: Colors.primary,
    borderWidth: Border.width.medium,
  },
  
  // Textos
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    marginBottom: Spacing.lg,
  },
  subtitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray[700],
    marginBottom: Spacing.md,
  },
  body: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
    lineHeight: 24,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
  },
  
  // Estados
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    backgroundColor: Colors.error,
    padding: Spacing.md,
    borderRadius: Border.radius.md,
    marginBottom: Spacing.md,
  },
  errorText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  success: {
    backgroundColor: Colors.success,
    padding: Spacing.md,
    borderRadius: Border.radius.md,
    marginBottom: Spacing.md,
  },
  successText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  
  // Lista
  listItem: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    marginVertical: Spacing.xs,
    borderRadius: Border.radius.lg,
    ...Shadows.small,
  },
  listItemTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  listItemSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },
  
  // Header/Navegación
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  headerTitle: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    textAlign: 'center',
  },
  
  // Centrado
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Flexbox helpers
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  
  // Padding y margin helpers
  p0: { padding: 0 },
  p1: { padding: Spacing.xs },
  p2: { padding: Spacing.sm },
  p3: { padding: Spacing.md },
  p4: { padding: Spacing.lg },
  p5: { padding: Spacing.xl },
  
  m0: { margin: 0 },
  m1: { margin: Spacing.xs },
  m2: { margin: Spacing.sm },
  m3: { margin: Spacing.md },
  m4: { margin: Spacing.lg },
  m5: { margin: Spacing.xl },
  
  mt1: { marginTop: Spacing.xs },
  mt2: { marginTop: Spacing.sm },
  mt3: { marginTop: Spacing.md },
  mt4: { marginTop: Spacing.lg },
  mt5: { marginTop: Spacing.xl },
  
  mb1: { marginBottom: Spacing.xs },
  mb2: { marginBottom: Spacing.sm },
  mb3: { marginBottom: Spacing.md },
  mb4: { marginBottom: Spacing.lg },
  mb5: { marginBottom: Spacing.xl },
});