import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { getUserAuthData } from '@/entities/User';
import { profileActions } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';

interface EditableProfileCardHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = memo(
    (props: EditableProfileCardHeaderProps) => {
        const { className } = props;

        const { t } = useTranslation('profile');
        const authData = useSelector(getUserAuthData);
        const profileData = useSelector(getProfileData);
        const canEdit = authData?.id === profileData?.id;
        const readonly = useSelector(getProfileReadonly);
        const dispatch = useAppDispatch();

        const onEdit = useCallback(() => {
            dispatch(profileActions.setReadonly(false));
        }, [dispatch]);

        const onCancelEdit = useCallback(() => {
            dispatch(profileActions.cancelEdit());
        }, [dispatch]);

        const onSave = useCallback(() => {
            dispatch(updateProfileData());
        }, [dispatch]);

        return (
            <Card padding="24" fullWidth border="partial">
                                    <HStack
                                        max
                                        justify="between"
                                        className={classNames('', {}, [className])}
                                    >
                                        <Text title={t('Профіль')} />
                                        {canEdit && (
                                            <div>
                                                {readonly ? (
                                                    <Button
                                                        onClick={onEdit}
                                                        data-testid="EditableProfileCardHeader.EditButton"
                                                    >
                                                        {t('Редагувати')}
                                                    </Button>
                                                ) : (
                                                    <HStack gap="8">
                                                        <Button
                                                            onClick={onCancelEdit}
                                                            data-testid="EditableProfileCardHeader.CancelButton"
                                                            color="error"
                                                        >
                                                            {t('Відмінити')}
                                                        </Button>
                                                        <Button
                                                            onClick={onSave}
                                                            data-testid="EditableProfileCardHeader.SaveButton"
                                                            color="success"
                                                        >
                                                            {t('Зберегти')}
                                                        </Button>
                                                    </HStack>
                                                )}
                                            </div>
                                        )}
                                    </HStack>
                                </Card>
        );
    },
);