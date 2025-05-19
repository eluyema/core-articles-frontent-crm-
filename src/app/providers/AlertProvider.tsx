import { Alert, Box, CloseButton, Stack } from '@mantine/core';
import { AnimatePresence, motion } from 'framer-motion';
import { useAlert } from "../../features/Alert/model/hooks/useAlert.ts";
import { PropsWithChildren } from "react";
import { IconInfoCircle } from '@tabler/icons-react';

const AlertProvider = ({ children }: PropsWithChildren) => {
    const { alerts, closeAlert } = useAlert();

    return (
        <>
            <Box
                style={{
                    position: 'fixed',
                    top: 16,
                    right: 16,
                    zIndex: 99999999,
                    maxWidth: 400,
                }}
            >
                <Stack>
                    <AnimatePresence>
                        {alerts.map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Box style={{ position: 'relative' }}>
                                    <Alert
                                        title={alert.title}
                                        color={alert.color || 'blue'}
                                        withCloseButton={false}
                                        icon={<IconInfoCircle />}
                                    >
                                        <Box pr={30}>{alert.message}</Box>
                                        <CloseButton
                                            onClick={() => closeAlert(alert.id)}
                                            size="sm"
                                            style={{
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                            }}
                                        />
                                    </Alert>
                                </Box>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </Stack>
            </Box>
            {children}
        </>
    );
};

export default AlertProvider;
