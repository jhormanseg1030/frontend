import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border, Shadows } from './GlobalStyles';

export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  
  // Header personalizado
  header: {
    backgroundColor: Colors.primary,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderBottomLeftRadius: Border.radius['2xl'],
    borderBottomRightRadius: Border.radius['2xl'],
    ...Shadows.large,
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  welcomeText: {
    color: Colors.white,
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.xs,
    opacity: 0.9,
  },
  userName: {
    color: Colors.white,
    fontSize: Typography.fontSize['3xl'],
    fontWeight: Typography.fontWeight.bold,
    marginBottom: Spacing.sm,
  },
  userRole: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Border.radius.full,
    alignSelf: 'center',
  },
  userRoleText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  // Estadísticas
  statsContainer: {
    margin: Spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: Border.radius.xl,
    padding: Spacing.lg,
    ...Shadows.medium,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  statsIcon: {
    fontSize: Typography.fontSize.xl,
    marginRight: Spacing.sm,
  },
  statsTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
  },
  loadingContainer: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.fontSize.base,
    color: Colors.gray[500],
    marginTop: Spacing.sm,
  },
  errorContainer: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  errorText: {
    fontSize: Typography.fontSize.base,
    color: Colors.error,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: Colors.gray[50],
    borderRadius: Border.radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[200],
  },
  statNumber: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    textAlign: 'center',
    fontWeight: Typography.fontWeight.medium,
  },
  
  // Menú de navegación
  menuContainer: {
    padding: Spacing.lg,
  },
  menuTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: Border.radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'center',
    ...Shadows.medium,
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[100],
  },
  menuButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.8,
  },
  menuIcon: {
    fontSize: Typography.fontSize['3xl'],
    marginBottom: Spacing.sm,
  },
  menuButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    textAlign: 'center',
  },
  
  // Botón de logout especial
  logoutButtonContainer: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  logoutButton: {
    backgroundColor: Colors.error,
    borderRadius: Border.radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.medium,
  },
  logoutIcon: {
    fontSize: Typography.fontSize.xl,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  logoutButtonText: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.white,
  },
  
  // Animaciones
  fadeIn: {
    opacity: 1,
  },
  fadeOut: {
    opacity: 0,
  },
});