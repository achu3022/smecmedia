'use client'

import { useState } from 'react'
import { validateEmail, validatePhone, validateRequired } from '@/lib/utils'
import { COURSES } from '@/data/courses'
import GlassCard from '@/components/ui/GlassCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'

interface FormValues {
  fullName: string
  phone: string
  email: string
  courseInterest: string
  message: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  courseInterest?: string
}

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const initialValues: FormValues = {
  fullName: '',
  phone: '',
  email: '',
  courseInterest: '',
  message: '',
}

export default function EnrollmentForm() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')

  const validateField = (name: keyof FormValues, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        return validateRequired(value) ? undefined : 'Full name is required'
      case 'phone':
        if (!validateRequired(value)) return 'Phone number is required'
        return validatePhone(value) ? undefined : 'Please enter a valid 10-digit phone number'
      case 'email':
        if (!validateRequired(value)) return 'Email address is required'
        return validateEmail(value) ? undefined : 'Please enter a valid email address'
      case 'courseInterest':
        return validateRequired(value) ? undefined : 'Please select a course'
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    // Validate required fields
    const requiredFields: (keyof FormErrors)[] = ['fullName', 'phone', 'email', 'courseInterest']
    
    requiredFields.forEach((field) => {
      const error = validateField(field, values[field])
      if (error) {
        newErrors[field] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (name: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    
    // Clear error for this field if it exists and it's a field that can have errors
    if (name in errors && errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleBlur = (name: keyof FormErrors) => {
    const error = validateField(name, values[name])
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setFormState('submitting')

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // In a real implementation, you would send the data to your API here
      console.log('Form submitted:', values)
      
      setFormState('success')
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
      setFormState('error')
    }
  }

  const inputClassName = (hasError: boolean) => cn(
    'w-full px-4 py-3 rounded-lg border bg-card/50 text-text placeholder-text/50',
    'focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent',
    'transition-colors duration-200',
    hasError 
      ? 'border-red-500 focus:ring-red-500' 
      : 'border-gold/30 hover:border-gold/50'
  )

  if (formState === 'success') {
    return (
      <GlassCard className="p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-semibold text-gold mb-2">
            Thank You!
          </h3>
          <p className="text-text/80">
            We will contact you shortly.
          </p>
        </div>
        
        <MagneticButton
          variant="secondary"
          onClick={() => setFormState('idle')}
        >
          Send Another Message
        </MagneticButton>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="p-8">
      <h2 className="text-2xl font-display font-semibold text-gold mb-6">
        Enroll Now
      </h2>

      {formState === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">
            Something went wrong. Please try again or call us directly.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-text mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={values.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            className={inputClassName(!!errors.fullName)}
            placeholder="Enter your full name"
            disabled={formState === 'submitting'}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            value={values.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={inputClassName(!!errors.phone)}
            placeholder="Enter your 10-digit phone number"
            disabled={formState === 'submitting'}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={values.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={inputClassName(!!errors.email)}
            placeholder="Enter your email address"
            disabled={formState === 'submitting'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        {/* Course of Interest */}
        <div>
          <label htmlFor="courseInterest" className="block text-sm font-medium text-text mb-2">
            Course of Interest *
          </label>
          <select
            id="courseInterest"
            value={values.courseInterest}
            onChange={(e) => handleInputChange('courseInterest', e.target.value)}
            onBlur={() => handleBlur('courseInterest')}
            className={inputClassName(!!errors.courseInterest)}
            disabled={formState === 'submitting'}
          >
            <option value="">Select a course</option>
            {COURSES.map((course) => (
              <option key={course.id} value={course.slug}>
                {course.title}
              </option>
            ))}
          </select>
          {errors.courseInterest && (
            <p className="mt-1 text-sm text-red-400">{errors.courseInterest}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            value={values.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={inputClassName(false)}
            placeholder="Tell us about your goals and any questions you have..."
            disabled={formState === 'submitting'}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <MagneticButton
            variant="primary"
            type="submit"
            disabled={formState === 'submitting'}
            className="w-full"
          >
            {formState === 'submitting' ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </MagneticButton>
        </div>
      </form>
    </GlassCard>
  )
}