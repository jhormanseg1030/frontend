import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border, Shadows } from './GlobalStyles';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  
  // Header con logo/título
  headerContainer: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Border.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  logoIcon: {
    fontSize: 50,
    color: Colors.white,
  },
  appTitle: {
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  appSubtitle: {
    fontSize: Typography.fontSize.base,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  
  // Formulario
  formContainer: {
    backgroundColor: Colors.white,
    borderRadius: Border.radius.xl,
    padding: Spacing.xl,
    ...Shadows.large,
  },
  formTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  
  // Campos de entrada
  inputContainer: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.gray[700],
    marginBottom: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    borderRadius: Border.radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  inputWrapperFocused: {
    borderColor: Colors.primary,
    borderWidth: Border.width.medium,
    backgroundColor: Colors.white,
  },
  inputIcon: {
    fontSize: Typography.fontSize.lg,
    color: Colors.gray[400],
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Typography.fontSize.base,
    color: Colors.black,
    paddingVertical: Spacing.sm,
  },
  
  // Botones
  buttonContainer: {
    marginTop: Spacing.lg,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: Border.radius.lg,
    paddingVertical: Spacing.lg,
    alignItems: 'center',
    ...Shadows.medium,
  },
  loginButtonPressed: {
    backgroundColor: Colors.primaryDark,
    transform: [{ scale: 0.98 }],
  },
  loginButtonDisabled: {
    backgroundColor: Colors.gray[400],
    opacity: 0.6,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  
  // Estados de carga y error
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
  },
  loadingText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    marginLeft: Spacing.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  errorContainer: {
    backgroundColor: Colors.error,
    borderRadius: Border.radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorIcon: {
    fontSize: Typography.fontSize.base,
    color: Colors.white,
    marginRight: Spacing.sm,
  },
  errorText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    flex: 1,
    fontWeight: Typography.fontWeight.medium,
  },
  
  // Footer
  footerContainer: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
  },
  
  // Credenciales de prueba
  credentialsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: Border.radius.lg,
    padding: Spacing.md,
    marginTop: Spacing.lg,
  },
  credentialsTitle: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  credentialsText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: Typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
});