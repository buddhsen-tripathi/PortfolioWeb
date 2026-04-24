'use client';;
import * as React from 'react';
import { motion, isMotionComponent } from 'motion/react';
import { cn } from '@/lib/utils';

function mergeRefs(...refs: any[]) {
  return (node: any) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref).current = node;
      }
    });
  };
}

function mergeProps(childProps: any, slotProps: any) {
  const merged = { ...childProps, ...slotProps };

  if (childProps.className || slotProps.className) {
    merged.className = cn(childProps.className, slotProps.className);
  }

  if (childProps.style || slotProps.style) {
    merged.style = {
      ...(childProps.style),
      ...(slotProps.style),
    };
  }

  return merged;
}

function Slot(
  {
    children,
    ref,
    ...props
  }: any
) {
  const isAlreadyMotion =
    typeof children.type === 'object' &&
    children.type !== null &&
    isMotionComponent(children.type);

  const Base = React.useMemo(() =>
    isAlreadyMotion
      ? (children.type)
      : motion.create(children.type), [isAlreadyMotion, children.type]);

  if (!React.isValidElement(children)) return null;

  const { ref: childRef, ...childProps } = children.props as any;

  const mergedProps = mergeProps(childProps, props);

  return (<Base {...mergedProps} ref={mergeRefs(childRef, ref)} />);
}

export { Slot };
