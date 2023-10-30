import { Popover, Button as AntdButton, Tooltip, Spin, Popconfirm, message } from 'antd';
import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { DELETE_CATEGORY, GET_CATEGORIES } from '../../../../api/category';
import { useMutation } from '@apollo/client';
import UpdateModal from './UpdateModal';

type IProps = {
    name: string | React.ReactNode;
    slug?: string;
    parentId?: number;
    id?: number;
    icon?: React.ReactNode;
    to?: string;
    href?: string;
    hadChildren?: boolean;
    isDropdown?: boolean;
    onClick(): void | undefined;
    actions?: boolean;
    className?: string;
};

function Button(props: IProps) {
    const [open, setOpen] = useState(false)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)
    const [isLoading, setIsLoading] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let Comp: any = 'button';
    const onHandleClick = () => props.onClick();
    const prps: { to?: string; href?: string } = {};
    if (props.to) {
        Comp = NavLink;
        prps.to = props.to;
    } else if (props.href) {
        Comp = 'a';
        prps.href = props.href;
    } else if (props.hadChildren) {
        Comp = 'button';
        prps.href = undefined;
        prps.to = undefined;
    }

    const onPopoverClick = (event: React.MouseEvent) => {
        event.stopPropagation(); // Ngăn chặn sự kiện click lan rộng lên Comp
    };

    const handelOpen = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(prev => !prev)
    }

    const removeCategory = async (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsLoading(true);
        const res = await deleteCategory({
            variables: {
                id: parseInt(props.id! as unknown as string)
            },
            refetchQueries: [{ query: GET_CATEGORIES }]
        })

        setIsLoading(false)
        if (res?.data) {
            message.success('deleteCategory successfully')
        } else {
            message.error('failed to delete category')
        }

    }

    return (
        <UpdateModal onOpen={handelOpen} open={open} id={props.id} parentId={props.parentId} name={props.name as string}>
            <Tooltip title={props.name} placement='right'>
                <span className='relative'>
                    <Comp
                        className={`${props.className || ''} relative w-full mx-auto rounded-xl h-14 items-center justify-between transition-all flex p-5 hover:bg-[rgba(0,0,0,0.1)] text-black dark:text-white `}
                        onClick={onHandleClick || undefined}
                        {...prps}
                    >
                        <p style={{ WebkitLineClamp: '1', wordBreak: 'break-word', overflowWrap: 'break-word', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical' }} className='w-full pr-[26px] text-left hover:text-hightLigh'>
                            {props.icon && <span className='py-1'>{props.icon}</span>}
                            {props.name}
                        </p>
                        {props.id &&
                            <span>
                                {props.isDropdown ? (
                                    <AiFillCaretDown />
                                ) : (
                                    <AiFillCaretUp />
                                )}
                            </span>
                        }

                    </Comp>
                    {isLoading ? <Spin className='absolute top-[20%] right-10'></Spin> : (
                        <>
                            {
                                props.actions && <Popover content={() => (
                                    <div>
                                        <>
                                            <AntdButton onClick={handelOpen} className='w-full text-left border-0'>Edit</AntdButton>
                                            <Popconfirm
                                                title="Are you sure to delete this category?"
                                                okButtonProps={{ className: 'bg-blue-400' }}
                                                onCancel={() => message.error('Cancel')}
                                                onConfirm={(e) => removeCategory(e!)}
                                            >
                                                <AntdButton className='w-full text-left border-0 text-red-400'>Delete</AntdButton>
                                            </Popconfirm>
                                        </>
                                    </div>
                                )} trigger="hover">
                                    <AntdButton onClick={onPopoverClick} className={`absolute top-[20%] right-10`} icon={<BiDotsHorizontalRounded />} shape='circle'></AntdButton>
                                </Popover>
                            }
                        </>
                    )}
                </span>
            </Tooltip>
        </UpdateModal >
    );
}

export default Button;