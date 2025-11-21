import { StyleSheet } from 'react-native';
import { Colors, Typography, Spacing, Border, Shadows } from './GlobalStyles';

export const productsStyles = StyleSheet.create({
  // Container
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Loading
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSize.base,
    color: Colors.gray[600],
  },

  // Header
  header: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: Colors.gray[200],
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
  },

  // Actions
  actionsContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    borderBottomWidth: Border.width.thin,
    borderBottomColor: Colors.gray[200],
  },

  // Cards
  list: {
    flex: 1,
  },
  listContent: {
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Border.radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[200],
    ...Shadows.small,
  },
  cardContent: {
    flex: 1,
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  cardSubtitle: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[600],
    marginBottom: Spacing.xs,
  },
  cardMeta: {
    fontSize: Typography.fontSize.xs,
    color: Colors.gray[500],
    marginBottom: Spacing.xs,
  },
  cardPrice: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.success,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
  },

  // Buttons
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.md,
    alignItems: 'center',
    ...Shadows.small,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  secondaryButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.md,
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.black,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  actionButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Border.radius.sm,
    minWidth: 70,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.info,
  },
  editButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },
  deleteButton: {
    backgroundColor: Colors.error,
  },
  deleteButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyText: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySubtext: {
    fontSize: Typography.fontSize.sm,
    color: Colors.gray[500],
    textAlign: 'center',
  },

  // Error State
  errorContainer: {
    backgroundColor: Colors.gray[50],
    margin: Spacing.lg,
    padding: Spacing.lg,
    borderRadius: Border.radius.md,
    borderWidth: Border.width.thin,
    borderColor: Colors.error,
  },
  errorText: {
    color: Colors.error,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
    marginBottom: Spacing.sm,
  },
  retryButton: {
    alignSelf: 'flex-start',
  },
  retryButtonText: {
    color: Colors.error,
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    textDecorationLine: 'underline',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: Border.radius.lg,
    padding: Spacing.xl,
    margin: Spacing.lg,
    maxHeight: '80%',
    width: '90%',
    ...Shadows.large,
  },
  modalHeader: {
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.black,
    textAlign: 'center',
  },

  // Form
  formContainer: {
    marginBottom: Spacing.lg,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  input: {
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    borderRadius: Border.radius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    fontSize: Typography.fontSize.base,
    color: Colors.black,
    backgroundColor: Colors.background,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    borderRadius: Border.radius.md,
    backgroundColor: Colors.background,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },

  // Additional missing styles
  pickerContainer: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.medium,
    color: Colors.black,
    marginBottom: Spacing.xs,
  },
  cancelButton: {
    backgroundColor: Colors.white,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.md,
    borderWidth: Border.width.thin,
    borderColor: Colors.gray[300],
    alignItems: 'center',
    flex: 1,
  },
  cancelButtonText: {
    color: Colors.black,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Border.radius.md,
    alignItems: 'center',
    flex: 1,
  },
  saveButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.medium,
  },
});