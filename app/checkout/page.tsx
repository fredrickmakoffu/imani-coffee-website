"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Lock, 
  CreditCard, 
  Truck, 
  ShoppingBag,
  Check,
  Plus,
  Minus,
  X
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
  image?: string;
}

interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentStep, setCurrentStep] = useState(1); // 1: Contact & Address, 2: Payment, 3: Confirmation
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Mock cart data - in a real app, this would come from context/state management
  useEffect(() => {
    const mockCartItems: CartItem[] = [
      {
        id: "1",
        name: "Ethiopia Guji Uraga",
        price: 28,
        quantity: 2,
        type: "coffee",
        image: "/images/coffee-1.jpg"
      },
      {
        id: "14",
        name: "Ceramic Pour Over Dripper",
        price: 35,
        quantity: 1,
        type: "merch",
        image: "/images/coffee-2.jpg"
      }
    ];
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTax = () => {
    return getSubtotal() * 0.08; // 8% tax
  };

  const getShippingCost = () => {
    switch (selectedShipping) {
      case "express": return 15;
      case "overnight": return 25;
      default: return 5; // standard
    }
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShippingCost();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setPaymentInfo({ ...paymentInfo, cardNumber: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPaymentInfo({ ...paymentInfo, expiryDate: value });
  };

  const processOrder = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessing(false);
    setCurrentStep(3); // Move to confirmation step
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-bridal-health flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-trace-ash mb-4">Order Complete!</h1>
          <p className="text-trace-ash/70 mb-6">
            Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="space-y-3">
            <Button className="w-full" asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bridal-health">
      {/* Header */}
      <div className="border-b border-trace-ash/10 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/shop" 
              className="flex items-center space-x-2 text-trace-ash hover:text-cod-gray transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm uppercase tracking-wide">Back to Shop</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-trace-ash/60" />
              <span className="text-sm text-trace-ash/60">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-trace-ash mb-2">Checkout</h1>
              <p className="text-trace-ash/60">Complete your order below</p>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-trace-ash text-bridal-health' 
                      : 'bg-swiss-coffee text-trace-ash/60'
                  }`}>
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ml-2 ${
                      currentStep > step ? 'bg-trace-ash' : 'bg-swiss-coffee'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Labels */}
            <div className="flex justify-between text-xs text-trace-ash/60 uppercase tracking-wide">
              <span className={currentStep >= 1 ? 'text-trace-ash font-medium' : ''}>Contact & Address</span>
              <span className={currentStep >= 2 ? 'text-trace-ash font-medium' : ''}>Payment</span>
              <span className={currentStep >= 3 ? 'text-trace-ash font-medium' : ''}>Confirmation</span>
            </div>

            {/* Step 1: Contact & Address Information */}
            {currentStep >= 1 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-trace-ash">Contact & Shipping Information</h2>
                  {currentStep > 1 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentStep(1)}
                    >
                      Edit
                    </Button>
                  )}
                </div>
                
                {currentStep === 1 ? (
                  <div className="space-y-4">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-trace-ash">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={shippingInfo.email}
                            onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                            placeholder="Enter your email"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-4 pt-4 border-t border-trace-ash/10">
                      <h3 className="font-medium text-trace-ash">Shipping Address</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            value={shippingInfo.firstName}
                            onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            value={shippingInfo.lastName}
                            onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                          placeholder="Street address"
                        />
                      </div>

                      <div>
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input
                          id="apartment"
                          type="text"
                          value={shippingInfo.apartment}
                          onChange={(e) => setShippingInfo({...shippingInfo, apartment: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            type="text"
                            value={shippingInfo.city}
                            onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            type="text"
                            value={shippingInfo.state}
                            onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            type="text"
                            value={shippingInfo.zipCode}
                            onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setCurrentStep(2)}
                      className="w-full"
                      disabled={!shippingInfo.email || !shippingInfo.phone || !shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zipCode}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-trace-ash/70 space-y-2">
                    <div>
                      <span className="font-medium">Contact:</span> {shippingInfo.email} • {shippingInfo.phone}
                    </div>
                    <div>
                      <span className="font-medium">Shipping to:</span> {shippingInfo.firstName} {shippingInfo.lastName}
                    </div>
                    <div>{shippingInfo.address}</div>
                    {shippingInfo.apartment && <div>{shippingInfo.apartment}</div>}
                    <div>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Payment */}
            {currentStep >= 2 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-trace-ash">Payment Information</h2>
                  {currentStep > 2 && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setCurrentStep(2)}
                    >
                      Edit
                    </Button>
                  )}
                </div>

                {currentStep === 2 ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          className="pl-10"
                          placeholder="1234 5678 9012 3456"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-trace-ash/60" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '').substring(0, 4)})}
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        type="text"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                        placeholder="Full name as on card"
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreeToTerms}
                        onChange={(e) => setAgreeToTerms(e.target.checked)}
                        className="w-4 h-4 text-trace-ash rounded"
                      />
                      <label htmlFor="terms" className="text-sm text-trace-ash/70">
                        I agree to the{" "}
                        <Link href="/terms" className="text-trace-ash hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-trace-ash hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <Button 
                      onClick={processOrder}
                      className="w-full"
                      disabled={
                        !paymentInfo.cardNumber || 
                        !paymentInfo.expiryDate || 
                        !paymentInfo.cvv || 
                        !paymentInfo.nameOnCard || 
                        !agreeToTerms ||
                        isProcessing
                      }
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-bridal-health mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Pay ${getTotal().toFixed(2)}
                        </>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-trace-ash/70">
                    <p>Payment method: **** **** **** {paymentInfo.cardNumber.slice(-4)}</p>
                    <p>Cardholder: {paymentInfo.nameOnCard}</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep >= 3 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-trace-ash mb-2">Order Confirmed!</h2>
                    <p className="text-trace-ash/70">
                      Thank you for your purchase. Your order has been successfully processed.
                    </p>
                  </div>

                  <div className="bg-swiss-coffee/30 rounded-lg p-4 text-left space-y-2">
                    <h3 className="font-semibold text-trace-ash mb-3">Delivery Information</h3>
                    <div className="text-sm text-trace-ash/70 space-y-1">
                      <p><span className="font-medium">Order Total:</span> ${getTotal().toFixed(2)}</p>
                      <p><span className="font-medium">Delivery Address:</span></p>
                      <p className="ml-4">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p className="ml-4">{shippingInfo.address}</p>
                      {shippingInfo.apartment && <p className="ml-4">{shippingInfo.apartment}</p>}
                      <p className="ml-4">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}</p>
                      
                      <p className="pt-2">
                        <span className="font-medium">Estimated Delivery:</span>{" "}
                        {selectedShipping === "overnight" 
                          ? "Tomorrow" 
                          : selectedShipping === "express" 
                          ? "2-3 business days" 
                          : "5-7 business days"}
                      </p>
                    
                    </div>
                  </div>

                  <div className="text-sm text-trace-ash/60 bg-bridal-health/50 rounded-lg p-3">
                    <p>
                      📧 A confirmation email has been sent to <strong>{shippingInfo.email}</strong>
                    </p>
                    <p className="mt-1">
                      📱 You&apos;ll receive tracking information via text at <strong>{shippingInfo.phone}</strong>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button className="flex-1" asChild>
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-trace-ash mb-6">Order Summary</h2>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-swiss-coffee rounded-lg flex items-center justify-center overflow-hidden">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        ) : (
                          <div className="text-trace-ash/40 text-2xl">
                            {item.type === "coffee" ? "☕" : "🛍️"}
                          </div>
                        )}
                      </div>
                      <div className="absolute -top-2 -right-2 bg-trace-ash text-bridal-health text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-trace-ash text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-trace-ash/60 capitalize">{item.type}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="w-6 h-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    
                    <div className="text-sm font-semibold text-trace-ash">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-trace-ash/10 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-trace-ash/70">Subtotal</span>
                  <span className="text-trace-ash">${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-trace-ash/70">Shipping</span>
                  <span className="text-trace-ash">${getShippingCost().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-trace-ash/70">Tax</span>
                  <span className="text-trace-ash">${getTax().toFixed(2)}</span>
                </div>
                <div className="border-t border-trace-ash/10 pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-trace-ash">Total</span>
                    <span className="text-trace-ash">${getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-swiss-coffee/30 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-trace-ash/70">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
