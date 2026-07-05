# ADR-006: AI Content Requires Teacher Review

**Status:** Accepted  
**Date:** 2026-01-01  
**Deciders:** Product + Engineering

## Context

AI-generated questions may contain errors, bias, or inappropriate content. Student-facing content must meet educational quality standards.

## Decision

All AI-generated questions enter the question bank with status `draft`. Teachers must explicitly review and publish before students can access them.

## Consequences

**Positive:** Quality gate; regulatory trust; teacher remains in control.

**Negative:** Adds teacher workflow step; AI time savings partially offset by review time.
